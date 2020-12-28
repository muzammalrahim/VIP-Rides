<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
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

$maxEvents      = 100;
$timeMax        = date('c',strtotime('next month'));
$initialDate    = date('c');

if (isset($_GET) && !empty($_GET)) {
    if (isset($_GET['finalDate']) && !empty($_GET['finalDate'])) {
        $timeMax = $_GET['finalDate'];
        $timeMax = date('c',strtotime($_GET['finalDate']));
    }
    if (isset($_GET['initialDate']) && !empty($_GET['initialDate'])) {
        $initialDate = date('c',strtotime($_GET['initialDate']));

    }
    if (isset($_GET['maxEvents']) && !empty($_GET['maxEvents'])) {
       $maxEvents = $_GET['maxEvents'];
    }
}

/*$data = json_decode(file_get_contents("php://input"), true);
if(isset($data) && !empty($data)){
    if (isset($data['finalDate'] && !empty($finalDate))) {
        $data = $_GET['finalDate'];
    }
    if (isset($data['maxEvents']) && !empty($data['maxEvents'])) {
        $maxEvents = $data['maxEvents'];
    }
}*/

// Get the API client and construct the service object.
$client = getClient();
$service = new Google_Service_Calendar($client);

// Print the next 10 events on the user's calendar.
$calendarId = 'primary';

date_default_timezone_set('Australia/Adelaide');
$optParams = array(
  'maxResults' => $maxEvents,
  'orderBy' => 'startTime',
  'singleEvents' => true,
   // 'timeMin' => '2020-10-01T00:00:00+00:00',//date('c'),
  'timeMin' => $initialDate,
  'timeMax' => $timeMax
);
$results = $service->events->listEvents($calendarId, $optParams);
$events = $results->getItems();
$totaleventsoftimelost = sizeof($events);

$dateObj = '';
$disableddates = [];
if (empty($events)) {
    print "No upcoming events found.\n";
} else {
    foreach ($events as $event) {
        $start = $event->start->dateTime;
        $dateObj = explode('T', $start);
        array_push($disableddates, $dateObj[0]);
    }
    if (!empty($disableddates)) {
        $tmp = array_count_values($disableddates);
        $check_disable = '';
        $disabledDatesObj = [];
        foreach ($disableddates as $disableddate) {
            $check_disable = $tmp[$disableddate];
            if (isset($check_disable) && !empty($check_disable) && $check_disable >= 3) {
                array_push($disabledDatesObj, $disableddate);
            }
        }
        $disableddateFinal = [];
        $disableddateFinal = array_unique($disabledDatesObj);
    }
     // echo "<pre> disableddateFinal "; print_r( $disableddateFinal ); echo "</pre> ";  
    if (!empty($disableddateFinal)) {
        print_r( $disableddateFinal);
    }
}