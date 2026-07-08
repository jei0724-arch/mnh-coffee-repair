# mnh-coffee-repair 업데이트 파일을 로컬 저장소로 복사하고 GitHub에 한번에 업로드

$src = "$env:USERPROFILE\Downloads"
$dst = "$env:USERPROFILE\mnh-coffee-repair"

Copy-Item "$src\index.html","$src\request.html","$src\gallery.html","$src\case-detail.html","$src\contact.html","$src\admin.html","$src\confirm.html","$src\logo.jpg" -Destination $dst -Force

cd $dst
git add .
git commit -m "로고 이미지 적용 및 페이지 업데이트"
git push
