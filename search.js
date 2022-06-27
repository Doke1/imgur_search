const $btn = document.getElementById("button");
const $input = document.getElementById("input");
const $list = document.getElementById("idk");

function search() {
    if($list.querySelectorAll("li")?.length > 0) $list.innerHTML = "";
    if($input.value.length < 1) return false;
    const getData = async (search) => {
        await fetch(`http://localhost/search/getData.php`, {
            method: "POST",
            body: JSON.stringify({data: search}),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            if(res.status >= 200 && res.status <= 299) {
                res.text().then((data) => {
                    let imgs = JSON.parse(data);
                    for(let i = 0; i < imgs.length; i++) {
                        $list.innerHTML += `
                            <li>
                                <img src="${imgs[i]}" width="250" height="250" />
                            </li>
                        `
                    }
                })
            }
        }).catch((err) => console.error(err));
    }

    getData($input.value)
}

$btn.addEventListener("click", search)