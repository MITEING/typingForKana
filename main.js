
const pre_input = document.getElementById("pre_input");
const input = document.getElementById("input");
const subject = document.getElementById("subject");
input.focus()


let corrected_subject_text = ""
let subject_text = ""

//test
test_main();
function test_main() {
    nextSubject()
    RefreshView();
}

function nextSubject() {
    setSubject(subject_table[Math.floor(Math.random() * subject_table.length) ]);
}


//正解をセット
function setSubject(new_text) {
    corrected_subject_text = "";
    subject_text = new_text; 
}

//入力された文字の正解してる分をしらべる。
//return: 確定してない部分を返す。
function TextCheck(enter_text) {

    const length = Math.min(subject_text.length, enter_text.length);
    if (length == 0) {
        return enter_text;
    }

    let hasIncorrect = false; //どっかにミスがあったか

    //先頭から確定していい文字を決定する。
    for (let i = 0; i < length; i++) {

        //iで違う＝iより前を確定させる。
        console.log(enter_text[i] + " vs " + subject_text[i]);
        if (enter_text[i] != subject_text[i]) {
            hasIncorrect = true;

            //ないならかえる
            if (i == 0) {
                console.log("incorrect");
                break;
            }

            //確定
            console.log("correct : " + subject_text.slice(0, i));
            corrected_subject_text += subject_text.slice(0, i);
            subject_text = subject_text.slice(i);
            enter_text   = enter_text.slice(i);
        }
    }

    //間違いなし＝全部OK
    if (!hasIncorrect) { 
        //確定
        console.log("correct : " + subject_text.slice(0, length));
        corrected_subject_text += subject_text.slice(0, length);
        subject_text = subject_text.slice(length);
        enter_text   = enter_text.slice(length);
    }

    return enter_text;
}


//表示を更新
function RefreshView() {
    console.log(subject_text);

    subject.innerHTML = "<subject_correct>" + corrected_subject_text + "</subject_correct><subject>" + subject_text + "</subject>"; 
    pre_input.innerHTML = corrected_subject_text;
}


// +---------------------------------------------------------------------
// |   event
// +---------------------------------------------------------------------

// 入力開始
input.addEventListener('compositionstart', function(){
    console.log("入力開始");
});

// 入力終了
input.addEventListener('compositionend', function(){
    console.log("入力終了");

    input.value = TextCheck(input.value);

    if (subject_text == "") {
        nextSubject();
    }

    RefreshView();
});