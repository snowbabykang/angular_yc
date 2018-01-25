<?php

if ( !empty( $_FILES ) ) {
	$timestamp = $_POST["timestamp"] ;
// 	echo $timestamp;
    
    
	$img1 = 'http://img.atobo.com/UserFiles/Certificate/5/2/4/4/12/524412/Big/2008_6_2_17_15_3_9296.jpg';
	$img2 = 'http://img2.jc001.cn/img/409/1125409/124876142046.jpg';
	$a = array($img1=>"Dog",$img2=>"Dog2");
	$img = array_rand($a,1);
    echo $img;

} else {

    echo 'No files';

}

?>