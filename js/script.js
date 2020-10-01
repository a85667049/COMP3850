// handle onChange events on image uploader
$(function(){
    $("#file0").change(function() {

        // format error handling here
        // ...... 

        let files = this.files 
        console.log(files)

        if (files) {

            let gallery = $('#thumbnail-gallery')

            for(let i=0; i<files.length; i++){

                var objUrl = getObjectURL(files[i]);
                console.log("objUrl = " + objUrl);
                if (objUrl) {
                    
                    // create an img wrapper
                    let div = document.createElement("div")
                    div.className = "tb-img-wrapper"
                    // create an img elem
                    let img = document.createElement('img')
                    $(img).attr("src", objUrl)

                    // insert img to the wrapper
                    div.insertAdjacentElement('beforeend', img)

                    // append the img wrapper to the gallery div
                    gallery.append(div)

                    // add click event to each thumbnail wrapper
                    $(div).click(function(e) {

                        let objUrl = $(this).children()[0].src

                        $('#img0').attr("src", objUrl);

                        
                        $('#preview_img0').data("source", objUrl)
                        
                        console.log( '#preview_img0' + $('#preview_img0').data("source") )
                    });

                } else {
                    //Under IE, use filters
                    this.select();
                    var imgSrc = document.selection.createRange().text;
                    var localImagId = document.getElementById("sss");
            
                }
            }

            // add thumbnail gallery wrapper styles 
            $('#thumbnail-gallery-wrapper').css({
                overflowX: "scroll",
                position: "relative",
                height: 120           
            })

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
        return url;
    }

    // preview link
    $('#preview_img0').on('click', ()=>{
        
        let objURL = $('#preview_img0').data('source')
        console.log('objUrl', objURL)

        // if it's the default picture
        if(objURL==="")
            objURL = $('#preview_img0').children()[0].src
        
        $.fancybox.open(`<img src=${objURL} >`)
        

    })
})
