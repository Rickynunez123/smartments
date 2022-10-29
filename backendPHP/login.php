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
    
  </head>
  <body>
      <div class="block" style="min-height: 100vh">
          <div class="container" style="max-width: 640px;">
              <div class="blob">
                  <h2 style="text-align: center;">Welcome to Smartments!</h2>
                  <h5 style="text-align: center;">Login to continue or <a href="createAccount.php" style="text-align: center;">create account</a></h5>
                  <form method="post" action="<?php echo $_SERVER['PHP_SELF'];?>">
                      <label for="username">Username</label>
                      <input type="text" id="username" name="username" placeholder="Username" required>

                      <label for="password">Password</label>
                      <input type="password" id="password" name="password" placeholder="Password" required>

                      <input type="submit" class="btn-login" value="Login">
                  </form><br>
                  <div style="margin-top: 24px;"><a href="forgotPassword.php" style="margin-top: 16px">Forgot password?</a></div>
              </div>
          </div>
      </div>
      <?php
      function alert($message) {
	    echo "<script>alert('$message');</script>";
      }

      if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // collect value of input field
        $username = $_POST['username'];
        $password = $_POST['password'];

        // TODO ======================================================================
        // Filter input for security!
        // ===========================================================================

        $hPassword = hash('sha256', $password . $username);
        
        //initialize database connection
	    $mysqli = new mysqli("localhost","smartments","Smartments#2022","Smartments");
        
        //verify database connection succeeded 
	    if ($mysqli -> connect_errno) {
		    alert("Could Not Connect To Database!");
	    } else {
            
            //SQL command string
            $queryString = "SELECT COUNT(*) FROM Users WHERE username='$username' AND password='$hPassword'";
            //execute sql query
		    $result = $mysqli->query($queryString);
            
            
            //see if login is valid and redirect
            if($result->fetch_row()[0] > 0) {
                header("Location: tenant.php");
            }
	    }
      }
      ?>
  </body>
</html>
