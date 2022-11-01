<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Maintenance Request</title>
  <!--Font-->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
  <!-- Use styles -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
  <link rel="stylesheet" href="../css/normalize.css" />
  <link rel="stylesheet" href="../css/styles.css" />
  <link rel="stylesheet" href="../css/maintenanceStyles.css" />
  <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
  <!--javascript animation-->

</head>

<body>

  <div class="sidebar">
    <a class="home" href="tenant.php"> Home </a>
    <a class="payments" href=""> Payments History</a>
    <a class="maintenance" href="maintenance.php"> Maintenance </a>
    <a class="property" href=""> Property Details</a>
    <a class="Account Profile" href=""> Account Profile </a>
    <!-- TEMPORARY BUTTON, must be replaced with proper log out! -->
    <a class="logout" href="index.php"> Logout </a>
  </div>

  <div class="block" style="min-height: 100vh">
    <div class="container" style="max-width: 800px;">
      <div class="blob">
        <h2 style="text-align: left;">Maintenance Request</h2>
        <form method="post">

          <div>
            <label for="fname">Full name:</label>
            <input type="text" id="fname" name="fname" placeholder="Full name" required>

          </div>

          <label for="problem">What seems to be the problem?</label>

          <textarea id="problem" name="problem" rows="15" cols="67">
                      </textarea>


          <div class="priority">
            <label for="priority">Request Priority</label><br>
            <input type="radio" id="high" name="priority" value="high">
            <label class="radioleft" for="high">HIGH (within 24 hours)</label><br>
            <input type="radio" id="medium" name="priority" value="medium">
            <label class="radioleft" for="medium">MEDIUM (within the week)</label><br>
            <input type="radio" id="low" name="priority" value="low">
            <label class="radioleft" for="low">LOW (whenever)</label><br>
          </div>

          <input type="submit" class="btn-login" value="Submit">
        </form><br>
      </div>
    </div>
  </div>
  <?php
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // collect value of input field
    $name = $_POST['fname'];
    $problem = $_POST['problem'];
    $priority = $_POST['priority'];
  }
  ?>
</body>

</html>