
# COMP3850
GENESIS CARE - MEDICATION IDENTIFIER

## Installation

* 1. Download and install a XAMPP control panel. Then create a folder under the XAMPP control panel
    directory/htdocs call it projects. https://www.apachefriends.org/index.html

* 2. Clone the project from the following git repositorie to htdocs/projects in the XAMPP control panel program
    directory. https://github.com/a85667049/COMP3850.gi

* 3. Open the XAMPP control panel to start MYSQL, then click Admin. The PHP MSQL database interface will
    appear, click to create a new database, enter the name "genesis_care", then enter the database, click import
    to select the "genesis_care.sql" file provided in the project directory to proceed import, so the database is set
    up.

* 4. Open the XAMPP control panel to start Apache, and then click Admin. Enter
    http://localhost/projects/COMP3850/ in the address bar to open the web application.




## Project Guide

```.
├── css                     # css style
├── img                     # images
├── js 
    ├──jquery.fancybox.min  # fancyBox v3.5.7 popup plugin
    ├──jquery1.8.3.min      # javascript component
    ├──script               # javascript method
├── server                  # Back-end code directory
    ├── uploads             # images uploaded by the user 
    ├── db-config.php       # connect to database
    ├── staff.php           # build for staff page
    ├── upload.php          # upload method
├── genesis_care.sql        # database file  
├── index.html              # form page
├── License                 # License
├── readme.md               # readme
├── staff.html              # password page
```


## PROJECT PLAYERS


* GroupMembers

  * MadhavGupta
    Graphic designer Provide project graphic design support. Website graphic design( Photoshop and Dreamweaver
  
  * King Chung Li 
    Back end developer Develop the back-end application of the website. Server-side scripts(PHP)
  
  * Chenlin Zhu
    Front end developer Develop the front-end application of the website Client-side scripts(JavaScript and HTML)

  * Sun Woo Yi
    Group Leader,Tester Lead the group, assign to group members to work, submit project works Test website functionality

  * Jialiang Wei 
    Full stack developer Develop the front-end application of the website Client-side scripts(JavaScript and HTML) Construction of back-end server (PHP, PHPMSQL)




## License
[MIT](https://choosealicense.com/licenses/mit/)