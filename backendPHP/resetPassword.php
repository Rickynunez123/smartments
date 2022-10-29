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
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
    <!-- Use styles -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href="css/normalize.css" />
    <link rel="stylesheet" href="css/styles.css" />
    <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
    <!--javascript animation-->

    <script type="text/javascript" language="JavaScript">
        function CheckPasswords() {
            var one = document.createAccount.password.value;
            var another = document.createAccount.repass.value;
            if (one == another) {
                return true;
            }
            alert("Passwords don't match!");
            return false;
        }
    </script>
</head>

<body>
    <div class="block" style="min-height: 100vh">
        <div class="container" style="max-width: 640px;">
            <div class="blob">
                <h2>Create new Password</h2>
                <form name="resetPassword" method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">

                    <label for="password">New Password</label>
                    <input type="password" id="password" name="password" placeholder="Password" required>

                    <label for="repass">Confirm New Password</label>
                    <input type="password" id="repass" name="repass" placeholder="Re-enter password" required>

                    <input type="submit" class="btn-login" value="Change" onclick="return CheckPasswords();">

                    <input type="hidden" name="otp" id="otp" value="<?php echo $_GET['otp'] ?>" />
                </form><br>
                <div style="margin-top: 24px;"><a href="login.php">Back</a></div>
            </div>
        </div>
    </div>
    <?php
    function alert($message)
    {
        echo "<script>alert('$message');</script>";
    }
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // collect value of input field
        $password = $_POST['password'];
        $otp = $_POST['otp'];

        // TODO ======================================================================
        // Filter input for security!
        // ===========================================================================

        //initialize database connection
        $mysqli = new mysqli("localhost", "smartments", "Smartments#2022", "Smartments");

        //verify database connection succeeded 
        if ($mysqli->connect_errno) {
            alert("Could Not Connect To Database!");
        } else {
            //SQL command string
            $queryString = "SELECT user FROM OTP WHERE otp='$otp'";
            //execute sql query
            $result = $mysqli->query($queryString)->fetch_row();


            //check if OTP is valid
            if (isset($result[0])) {
                $username = $result[0];

                //delete OTP entry
                $deleteString = "DELETE FROM OTP WHERE otp='$otp'";
                $mysqli->query($deleteString);

                //hash password
                $hPassword = hash('sha256', $password . $username);

                //update password
                $updateString = "UPDATE Users SET password='$hPassword' WHERE username='$username'";
                if ($mysqli->query($updateString)) {
                    header("Location: login.php");
                }
            } else {
                header("Location: login.php");
            }
        }
    }
    ?>
</body>

</html>