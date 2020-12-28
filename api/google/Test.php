<?php
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);
require __DIR__ . '/vendor/autoload.php';

if (php_sapi_name() != 'cli') {
    //throw new Exception('This application must be run on the command line.');
} 

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
$calendarId = 'primary';
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
}

// if(isset($_POST) && !empty($_POST)){
//     //echo '<pre>';
//       // print_r($_POST);
//     //echo '</pre>';
//     $data = $_POST;
//     $times = explode('-',$data['time']);
    
//     // 24-hour time to 12-hour time 
//     //$time_in_12_hour_format  = date("g:i a", strtotime("13:30"));
//     // 12-hour time to 24-hour time 
//     $timeStart  = date("H:i", strtotime($times[0]));
//     $timeEnd    = date("H:i", strtotime($times[1]));
    
//     $start =  $data['date'].'T'.$timeStart.':00';
//     $end   =  $data['date'].'T'.$timeEnd.':00';
    
//     $data['summary'] = str_replace('<br>','',$data['summary']);
//     $eventArray = array(
//       'summary'      => $data['summary'],
//       'location'     => $data['location'],
//       'description'  => $data['description'],
//       'start' => array(
//         'dateTime' => $start,
//         'timeZone' => 'Asia/Singapore',
//       ),
//       'end' => array(
//         'dateTime' => $end,
//         'timeZone' => 'Asia/Singapore',
//       ),
//       'attendees' => array(
//         array(
//             'displayName' => $data['name'],
//             'email'       => $data['email'],
//             'comment'     => $data['phone']
//         )
//       ),
//       'source' => array(
//           'title' => 'Hi-Tec Mobile',
//           'url'   => 'https://hitecmobile.com.sg/',
//       ),
//       'reminders' => array(
//         'useDefault' => FALSE,
//         'overrides' => array(
//           array('method' => 'email', 'minutes' => 24 * 60),
//           array('method' => 'popup', 'minutes' => 10),
//         ),
//       ),
//     );
//     echo '<pre>';
//         print_r($eventArray);
//     echo '</pre>';
//     $event = new Google_Service_Calendar_Event($eventArray);
    
//     $calendarId = 'primary';
//     $event = $service->events->insert($calendarId, $event);
//     printf('Event created: %s\n', $event->htmlLink);
//     echo '<pre>';
//         print_r($event);
//     echo '</pre>';
// }