// handle onChange events on image uploader
$(function(){
    let allFiles = []
    const baseURL = "http://localhost/projects/COMP3850"

    $("#file0").change(function() {

        let files = this.files 

        if (files) {

            let gallery = $('#thumbnail-gallery')

            for(let i=0; i<files.length; i++){

                allFiles.push(files[i])

                // format error handling here
                let acceptable_formats = ['jpeg', 'jpg', 'png']
                let suffix = files[i].name.substring(files[i].name.lastIndexOf('.')+1)

                if(acceptable_formats.includes(suffix.toLowerCase())){

                        let objUrl = getObjectURL(files[i])

                        if (objUrl) {
                            
                            // create an img wrapper
                            let div = document.createElement("div")
                            div.className = "tb-img-wrapper"
                            // create an img elem
                            let img = document.createElement('img')
                            $(img).attr("src", objUrl)

                            //create a close btn
                            let closeBtn = document.createElement('span')
                            closeBtn.className = "close-btn"
                            closeBtn.textContent = "X"
                            
                            // insert close btn into the wrapper
                            div.insertAdjacentElement('afterbegin', closeBtn)

                            // insert img into the wrapper
                            div.insertAdjacentElement('beforeend', img)
        
                            // append the img wrapper to the gallery div
                            gallery.append(div)
        
                            // add click event to each thumbnail wrapper
                            $(div).click(function(e) {
                                
                                let objUrl = $(this).children()[1].src
                                console.log('clicked', div)
                                $('#img0').attr("src", objUrl)
        
                                
                                $('#preview_img0').data("source", objUrl)
                        
                            })

                            $(closeBtn).click( (e)=>{

                                // remove the image wrapper
                                $(e.target).parent().remove()

                                // remove this image file from the array
                                allFiles = allFiles.filter( f => f !== files[i] )

                                if(allFiles.length === 0){
                                    $('#thumbnail-gallery-wrapper').css({
                                        height: 0           
                                    })    
                                }
                                
                            })

                            // add thumbnail gallery wrapper styles 
                            $('#thumbnail-gallery-wrapper').css({
                                overflowX: "scroll",
                                position: "relative",
                                height: 120           
                            })        
                        }

                }else{
                    alert('Only jpeg, jpg and png format of files are allowed!')
                }
            }

        }
    });

    //Create a url that can access the file
    function getObjectURL(file) {
        var url = null;
        if (window.createObjectURL != undefined) { // basic
            url = window.createObjectURL(file);
        } else if (window.URL != undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
        }
        return url
    }

    // preview link
    $('#preview_img0').on('click', ()=>{
        
        let objURL = $('#preview_img0').data('source')
        console.log('objUrl', objURL)

        // if it's the default picture
        if(objURL==="")
            objURL = $('#preview_img0').children()[0].src
        
        $.fancybox.open(`<img src=${objURL} width="500" max-height="500">`)
        

    })

    // upload button click event 
    const alerths = (str) => {
        $("#tip").fadeIn()
        $("#tip .pack p").html(str)
        return false;
    }


    $(".acc_sure").on("click", (e) => {
        e.preventDefault()

        // sending ajax request
        let msg = $('.desc').val()

        if(msg!==""){

            let request = new XMLHttpRequest()
            
            // url needs to be changed after uploading files onto server 
            request.open("POST", baseURL+"/server/upload.php")

            // collect all the form data 
            let form = document.querySelector('#patient-form')
            let formData = new FormData(form)

            // get current epoch time
            let now = Math.floor(Date.parse(new Date())/1000.0)
            formData.append("timestamp", now) 

            // append all the uploaded files to form data
            for(let i=0; i < allFiles.length; i++){
                formData.append("file1[]", allFiles[i])
            }

            // delete form data named file0[] 
            formData.delete("file0[]")
            
            request.send(formData)
            
            request.onreadystatechange = () => {
                // if the ajax request has been completed and http request status has succeeded
                if( request.readyState == 4){

                    // clear all the inputs 
                    //$('input').val('')
                    $('textarea').val('')
                    allFiles = []

                    // cancel url reference to the image files
                    let imgs = $('.tb-img-wrapper img')
                    for(let i = 0; i< imgs.length; i++){
                        URL.revokeObjectURL(imgs[i].src)  
                        // remove thumnail wrappers
                        $(imgs[i]).parent().remove()
                    }
                    $('#thumbnail-gallery-wrapper').css({
                        height: 0           
                    }) 
                    alerths(request.responseText)
                }
            }

            // pop up the message box
            alerths("Your record is being uploaded... Please don't refresh the window.")

        }else{
            alerths("Your text message cannot be empty!")
        }
    
    })

    const formatDate = (unixTime) => {
        let date = new Date(unixTime*1000)
        let first = date.toLocaleDateString("en-GB")
        let second = date.toLocaleTimeString("en-US")
        return first+" "+second
    } 

    $('#staff-login').submit( (e) => {
     
        e.preventDefault()

        // send ajax request 
        let xhr = new XMLHttpRequest()

        xhr.open("POST", baseURL+"/server/staff.php")

        let data = new FormData(e.target)

        xhr.send(data)

        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4){
                let data = JSON.parse(xhr.responseText)
                console.log(data)

                for(let i=0; i<data.length; i++){

                    // display user info
                    let userAccordin = document.createElement("div")
                    userAccordin.id = "user-accordin"
                    userAccordin.innerHTML = `<h2>${data[i].name} - ${data[i].dob}</h2>`

                    let template = ""
                    let list = data[i].list
                    list.forEach(e => {
                        let time = formatDate(e.timestamp)

                        let button = document.createElement("button")
                        button.textContent = "View Image"
                        button.className = `view-image ${data[i].name}`
                        button.dataset.timestamp = e.timestamp 

                        template+= `<tr><td>${time}</td><td>${e.message}</td><td>${button.outerHTML}</td></tr>`
                    })

                    if($('#staff-login'))
                        $('#staff-login').hide()

                    $("#staff-body").append(`<div id="patient-info-wrapper">
                                                ${userAccordin.outerHTML}
                                                <table id="patients-table">
                                                    <tr><th>Time</th><th>Message</th><th>View Image</th></tr>
                                                    ${template}  
                                                </table>
                                        </div>`)

                    for(let j = 0; j<$(`.view-image.${data[i].name}`).length; j++){
                        
                        $(`.view-image.${data[i].name}`)[j].addEventListener('click', (e) => {
                            let time = e.target.dataset.timestamp
                            console.log(time)
    
                            // send another xhr request
                            let xhr = new XMLHttpRequest()
                            let params = "id="+time+"&"+"name="+data[i].name
                            xhr.open('GET', baseURL + "/server/staff.php?"+params)
                    
                            xhr.onreadystatechange = () => {
                                if(xhr.readyState === 4){
    
                                    let data = JSON.parse(xhr.responseText) 
                                    if(!data.error){  
                                                
                                        let template = ""
                                        data.forEach(e => {
                                            template+= `<div class="image-wrapper">
                                                            <a class="fancybox" data-fancybox="gallery" href="${baseURL}/${e.url}">
                                                                <img src="${baseURL}/${e.url}">
                                                            </a>
                                                        </div>` 
                                        })
    
                                        $.fancybox.open(`
                                                            <div id="images-popup-wrapper">
                                                                
                                                                    ${template}
                                                                
                                                            </div>
                                                        `)
                                    }else{
                                        $.fancybox.open(data.error)
                                    }
                                    
                                    $('.fancybox').fancybox({
                                        // Options will go here
                                        buttons: [
                                            "zoom",
                                            "close"
                                        ]
                                
                                    })
                                }
                            }
    
                            xhr.send()
    
                        }) 
                    }
                }

            }
        }

    })

})