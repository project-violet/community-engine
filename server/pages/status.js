// This source code is a part of Project Violet.
// Copyright (C) 2020-2021. violet-team. Licensed under the Apache-2.0 License.

const page400 = `
<html>
<head><title>400 Bad Request</title></head>
<body bgcolor="white">
<center><h1>400 Bad Request</h1></center>
<hr><center>Community Engine</center>
</body>
</html>
`;

const page403 = `
<html>
<head><title>403 Forbidden</title></head>
<body bgcolor="white">
<center><h1>403 Forbidden</h1></center>
<hr><center>Community Engine</center>
</body>
</html>
`;

const page404 = `
<html>
<head><title>404 Not Found</title></head>
<body bgcolor="white">
<center><h1>404 Not Found</h1></center>
<hr><center>Community Engine</center>
</body>
</html>
`;

const page405 = `
<html>
<head><title>405 Method Not Allowed</title></head>
<body bgcolor="white">
<center><h1>405 Method Not Allowed</h1></center>
<hr><center>Community Engine</center>
</body>
</html>
`;

module.exports = {
  p400: page400,
  p403: page403,
  p404: page404,
  p405: page405,
};
