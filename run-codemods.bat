@echo off
if NOT "%3" == "" if "%4" == "" goto START
echo Error: Incorrect arguments provided, please specify path to package.json, tsconfig, and src directory with
echo run-codemods.bat PACKAGE.JSON_PATH TSCONFIG_PATH SRC_PATH
goto :EOF

:START
call %~dp0node_modules\.bin\jscodeshift -t %~dp0transforms\typed-transforms.ts --extensions=ts,tsx --tsConfigPath=%2 %3
call %~dp0node_modules\.bin\jscodeshift -t %~dp0transforms\itwin-codemods.ts --extensions=js,ts --parser=ts %3
call %~dp0node_modules\.bin\jscodeshift -t %~dp0transforms\itwin-codemods.ts --extensions=jsx,tsx --parser=tsx %3
call node %~dp0transforms\update-packagejson.js %1
