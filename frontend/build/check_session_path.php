<?php
echo 'Session Save Path: ' . session_save_path();
echo 'Directory Permissions: ' . substr(sprintf('%o', fileperms('/app/tmp/sessions')), -4);

?>
