<?php
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);
require __DIR__ . '/vendor/autoload.php';

//if (php_sapi_name() != 'cli') {
    //throw new Exception('This application must be run on the command line.');
//}

/**
 * Returns an authorized API client.
 * @return Google_Client the authorized client object
 */
function getClient()
{
    $client = new Google_Client();
    $client->setApplicationName('Google Calendar API PHP Quickstart');
    $client->setScopes(Google_Service_Calendar::CALENDAR);
    $client->setAuthConfig(__DIR__ . '/credentials.json');
    $client->setAccessType('offline');
    $client->setPrompt('select_account consent');

    // Load previously authorized token from a file, if it exists.
    // The file token.json stores the user's access and refresh tokens, and is
    // created automatically when the authorization flow completes for the first
    // time.
    $tokenPath = 'token.json';
    if (file_exists($tokenPath)) {
        $accessToken = json_decode(file_get_contents($tokenPath), true);
        $client->setAccessToken($accessToken);
    }

    // If there is no previous token or it's expired.
    if ($client->isAccessTokenExpired()) {
        // Refresh the token if possible, else fetch a new one.
        if ($client->getRefreshToken()) {
            $client->fetchAccessTokenWithRefreshToken($client->getRefreshToken());
        } else {
            // Request authorization from the user.
            $authUrl = $client->createAuthUrl();
            printf("Open the following link in your browser:\n%s\n", $authUrl);
            print 'Enter verification code: ';
            $authCode = trim(fgets(STDIN));
            // $authCode = '4/4gFdOS6hpUmVtt5oVvPtrxEUrYNtvuuzmjF2FeejSANFhImY5ubICgxtAHpqrqO9CAtIjJxmsN2GAhvnpR7shac';

            // Exchange authorization code for an access token.
            $accessToken = $client->fetchAccessTokenWithAuthCode($authCode);
            $client->setAccessToken($accessToken);

            // Check to see if there was an error.
            if (array_key_exists('error', $accessToken)) {
                throw new Exception(join(', ', $accessToken));
            }
        }
        // Save the token to a file.
        if (!file_exists(dirname($tokenPath))) {
            mkdir(dirname($tokenPath), 0700, true);
        }
        file_put_contents($tokenPath, json_encode($client->getAccessToken()));
    }
    return $client;
}


// Get the API client and construct the service object.
$client = getClient();
$service = new Google_Service_Calendar($client);

// Print the next 10 events on the user's calendar.
//$calendarId = 'primary';

/*
$optParams = array(
  'maxResults' => 10,
  'orderBy' => 'startTime',
  'singleEvents' => true,
  'timeMin' => date('c'),
);
$results = $service->events->listEvents($calendarId, $optParams);
$events = $results->getItems();

if (empty($events)) {
    print "No upcoming events found.\n";
} else {
    print "Upcoming events:\n";
    foreach ($events as $event) {
        $start = $event->start->dateTime;
        if (empty($start)) {
            $start = $event->start->date;
        }
        printf("%s (%s)\n", $event->getSummary(), $start);
    }
}*/
$data = json_decode(file_get_contents("php://input"), true);
if(!empty($data)){
    $coffee = false;
    if(isset($data['coffee']) && !empty($data['coffee'])){
      $coffee     = $data['coffee'];
    }
    $date = '';
    if(isset($data['date']) && !empty($data['date'])){
      $date     = $data['date'];
    }
    $desc = '';
    if(isset($data['description']) && !empty($data['description'])){
      $desc     = $data['description'];
    }
    $distance = '';
    if(isset($data['distance']) && !empty($data['distance'])){
      $distance     = $data['distance'];
    }
    $drop = '';
    if(isset($data['dropingOffLoction']) && !empty($data['dropingOffLoction'])){
      $drop     = $data['dropingOffLoction'];
    }
    $email = '';
    if(isset($data['email']) && !empty($data['email'])){
      $email     = $data['email'];
    }
    $pick = '';
    if(isset($data['location']) && !empty($data['location'])){
      $pick     = $data['location'];
    }
    $name = '';
    if(isset($data['name']) && !empty($data['name'])){
      $name     = $data['name'];
    }
    $phone = '';
    if(isset($data['phone']) && !empty($data['phone'])){
      $phone     = $data['phone'];
    }
    $price = '';
    if(isset($data['price']) && !empty($data['price'])){
      $price     = $data['price'];
    }
    $summary = '';
    if(isset($data['summary']) && !empty($data['summary'])){
      $summary     = $data['summary'];
    }
    $time = '';
    if(isset($data['time']) && !empty($data['time'])){
      $time     = $data['time'];
    }
    $water = false;
    if(isset($data['water']) && !empty($data['water'])){
      $water     = $data['water'];
    }


    $real_time = '';
    $timeArray = explode('T', $time);
    if(!empty($timeArray)){
      if(isset($timeArray[0]) && !empty($timeArray[0])){
        $date_a = $timeArray[0];
      }
      if(isset($timeArray[1]) && !empty($timeArray[1])){
        $time_a = $timeArray[1];
        if(!empty($time_a)){
          $time_a_array = explode('+', $time_a);
          if(isset($time_a_array[0]) && !empty($time_a_array[0])){
            $real_time = $time_a_array[0];
          }
        }
      }
    }

    $start =  $time;
    $end   =  $time;
    
    $summary = str_replace('<br>','',$summary);


    $email_message = 'This is Confirmation of your trip with "VIP Rides". ';
    $email_message .= 'Your Trip start on "'.$date.'" at "'.$real_time.'" ';
    $email_message .= 'from "'.$pick.'" to "'.$drop.'". ';
    if($coffee == true && $water== true){
      $email_message .= 'Additionally you have choosed "Coffee" and "Water". ';
    }else if($coffee == false && $water== true){
      $email_message .= 'Additionally you have "Water". ';
    }else if($coffee == false && $water== true){
      $email_message .= 'Additionally you have "Coffee". ';
    }
    $email_message .= 'The Total distance of your trip is "'.$distance.'" and Total cost of your trip $"'.$price.'".';



    $eventArray = array(
      'summary'      => $summary,
      'location'     => $pick,
      'description'  => $email_message,//$desc,
      'start' => array(
        'dateTime' => $start,
        'timeZone' => 'Asia/Singapore',
      ),
      'end' => array(
        'dateTime' => $end,
        'timeZone' => 'Asia/Singapore',
      ),
      'attendees' => array(
        array(
            'displayName' => $name,
            'email'       => $email,
            'comment'     => $phone
        )
      ),
      'source' => array(
          'title' => 'Vip Rides',
          'url'   => 'https://viprides.com.au/',
      ),
      'reminders' => array(
        'useDefault' => FALSE,
        'overrides' => array(
          array('method' => 'email', 'minutes' => 24 * 60),
          array('method' => 'popup', 'minutes' => 10),
        ),
      ),
    );
    //echo '<pre>';
        //print_r($eventArray);
    //echo '</pre>';
    $event = new Google_Service_Calendar_Event($eventArray);
    //echo '<pre>';
       // print_r($event);
    //echo '</pre>';
    $calendarId = 'primary';
    $event = $service->events->insert($calendarId, $event);
    //printf('Event created: %s\n', $event->htmlLink);
    //echo '<pre>event ';
        //print_r($event);
    //echo '</pre>';
    
    if($event){
      $headers  = "From: VIPRides < info@viprides.com.au >\n";
      $headers .= "Reply-To: < chris@viprides.com.au >\n";
      $headers .= "X-Sender: VIPRides < info@viprides.com.au >\n";
      $headers .= 'X-Mailer: PHP/' . phpversion();
      $headers .= "X-Priority: 1\n"; // Urgent message!
      $headers .= "Return-Path: info@@viprides.com.au\n"; // Return path for errors
      $headers .= "MIME-Version: 1.0\r\n";
      $headers .= "Content-Type: text/html; charset=iso-8859-1\n";
      mail('vipridescalendar@gmail.com','Vip Rides Booking Confirmation',$email_message,$headers);
      mail($email,'Vip Rides Booking Confirmation',$email_message,$headers);
    }
    echo $email_message;
}