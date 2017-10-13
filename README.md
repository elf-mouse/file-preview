## 文件预览测试

- PDF (Word, Excel, PPT同)
- Txt
- Image
- Audio
- Video

## Serve big files through PHP

```php
// header("Access-Control-Allow-Origin: *"); // for local test

define("CHUNK_SIZE", 1024*1024); // Size (in bytes) of tiles chunk

// Read a file and display its content chunk by chunk
function readfile_chunked($filename, $retbytes = TRUE) {
  $buffer = "";
  $cnt =0;
  // $handle = fopen($filename, "rb");
  $handle = fopen($filename, "rb");
  if ($handle === false) {
    return false;
  }
  while (!feof($handle)) {
    $buffer = fread($handle, CHUNK_SIZE);
    echo $buffer;
    ob_flush();
    flush();
    if ($retbytes) {
      $cnt += strlen($buffer);
    }
  }
  $status = fclose($handle);
  if ($retbytes && $status) {
    return $cnt; // return num. bytes delivered like readfile() does.
  }
  return $status;
}

// Here goes your code for checking that the user is logged in
$filename = "path/to/your/file";
$mimetype = "mime/type";
header("Content-Type: ".$mimetype);
readfile_chunked($filename);
```
