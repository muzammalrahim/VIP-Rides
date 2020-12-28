<?php
if($_GET['mail'] == 'test'){
	$headers  = "From: VIPRides < info@viprides.com.au >\n";
	$headers .= "Reply-To: < chris@viprides.com.au >\n";
    $headers .= "X-Sender: VIPRides < info@viprides.com.au >\n";
    $headers .= 'X-Mailer: PHP/' . phpversion();
    $headers .= "X-Priority: 1\n"; // Urgent message!
    $headers .= "Return-Path: info@@viprides.com.au\n"; // Return path for errors
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=iso-8859-1\n";
	$email = 'ahsandev.creative@gmail.com';
	$email_message = 'Vip Rides Booking Test Mail';
    mail($email,'Vip Rides Booking Confirmation',$email_message,$headers);
    echo '<pre>';
    print_r($headers);
    echo '</pre>';
}