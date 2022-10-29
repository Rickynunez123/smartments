<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Login</title>
    <!--Font-->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
      rel="stylesheet"
    />
    <!-- Use styles -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href="css/normalize.css" />
    <link rel="stylesheet" href="css/styles.css" />
    <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" /> <!--javascript animation-->
    
  <body>
    <div class="block" style="min-height: 100vh">
      <div class="container" style="max-width: 640px;">
        <div class="blob">
          <h2 style="text-align: center;">Mail server test form</h2>
          <form method="post" action="<?php echo $_SERVER['PHP_SELF'];?>">
            <label for="username">To:</label>
            <input type="text" id="to" name="to" placeholder="To:" required>

            <label for="subject">Subject:</label>
            <input type="text" id="subject" name="subject" placeholder="Subject:" required>

            <label for="message">Message:</label>
            <input type="text" id="message" name="message" placeholder="Message:" required>

            <label for="from">From:</label>
            <input type="text" id="from" name="from" placeholder="From:" required>

            <input type="submit" class="btn-login" value="Send">
          </form><br>
        </div>
      </div>
    </div>


<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // collect value of input field
    $to = $_POST['to'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];
    $from = $_POST['from'];
    $headers = "From:" . $from;
    
    if(mail($to,$subject,$message,$headers))
    {
      echo "Mail Sent.";
    }
    else
    {
      echo "Could Not Send Mail!";
    }
}
?>

</body>
</html>
