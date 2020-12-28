<?php
header("Access-Control-Allow-Origin: *");

require 'vendor/autoload.php';

// This is a sample test API key. Sign in to see examples pre-filled with your key.
//\Stripe\Stripe::setApiKey('sk_test_McEyUwSrL9RyuFWCTaxv4dmd');
//\Stripe\Stripe::setApiKey('pk_live_mg5XZvJpSW92ejzfj9GzScif00pYIGk9p6');
\Stripe\Stripe::setApiKey('sk_live_DqmE7NwHQWNtP5gPC2XF7uGg00tBIDdHoG');



function calculateOrderAmount($items): int {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // customers from directly manipulating the amount on the client
  return 1400;
}

header('Content-Type: application/json');

try {
  // retrieve JSON from POST body
  $json_str = file_get_contents('php://input');
  $json_obj = json_decode($json_str);

  $paymentIntent = \Stripe\PaymentIntent::create([
    'amount' => calculateOrderAmount($json_obj->items),
    'currency' => 'usd',
  ]);

  $output = [
    'clientSecret' => $paymentIntent->client_secret,
  ];

  echo json_encode($output);
} catch (Error $e) {
  http_response_code(500);
  echo json_encode(['error' => $e->getMessage()]);
}