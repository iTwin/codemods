@echo off
if NOT "%2" == "" if "%3" == "" goto START
echo Error: Incorrect arguments provided, please specify path to tsconfig and directory to transform with
echo run-codemods.bat tsconfig.json ./src
goto :EOF

:START
call %~dp0node_modules\.bin\jscodeshift -t %~dp0transforms\typed-transforms.ts --extensions=ts,tsx --tsConfigPath=%1 %2
call %~dp0node_modules\.bin\jscodeshift -t %~dp0transforms\itwin-codemods.ts --extensions=ts --parser=ts %2
call %~dp0node_modules\.bin\jscodeshift -t %~dp0transforms\itwin-codemods.ts --extensions=tsx --parser=tsx %2
echo %~dp0