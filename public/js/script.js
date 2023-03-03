function renderPage(section){
    $('section').each(function(i){
        if($(this).attr("name") != section){
            $(this).hide();
        }else{
            $(this).show();
        }
    })
}
function btnSenha(num){
    let inputsenha = document.getElementById(`senha${num}`);
    if($(inputsenha).prop("type") == "password"){
        inputsenha.type="text";
    }else{
        inputsenha.type="password";
    }
}
document.onload(renderPage("index"))