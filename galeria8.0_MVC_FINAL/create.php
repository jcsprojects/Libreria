<?php 
if(!empty($_POST)){
    $fCreate= date("m.d.y");

    $almacenImg=("almacenImg");
    $createFile= fopen("backup/".$fCreate.".json", "a+");

    fwrite($file, $almacenImg);

    fclose($file);

}