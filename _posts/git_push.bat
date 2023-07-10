@echo off
chcp 65001 > nul

echo.
echo                                      GitHub自动上传脚本
echo ===================================================================================
echo.

set branch=master
set change=pangtiankai
echo.
set datetime=%date:~0,4%-%date:~5,2%-%date:~8,2% %time:~0,2%:%time:~3,2%:%time:~6,2%
set commit_message=%change% - %datetime%

for /d %%F in (*) do (
    if not exist "%%F\*" (
        echo nul > "%%F\.gitkeep"
    )
)


git pull .
git add .
git commit -m "%commit_message%"
git push origin %branch%

echo.
echo ===================================================================================
echo                                      更新完毕
echo.

pause
