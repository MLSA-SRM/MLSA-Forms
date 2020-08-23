module.exports = (array) => {
    let html = "";
    let headings = [];
    array.forEach(e => {
        switch (e.option) {
            case 'text':
                headings.push({ headings: e.desc, type: 'text', name: e.desc.replace(/[^A-Z0-9]/ig, "_") })
                html += `<div class="contentItems">
                ${e.desc}<br>
                <input type="text" name="${e.desc.replace(/[^A-Z0-9]/ig, "_")}" id="0" class="textF">
                </div>`;
                break;
            case "textarea":
                headings.push({ headings: e.desc, type: 'text', name: e.desc.replace(/[^A-Z0-9]/ig, "_") })
                html += `<div class="contentItems">
                    ${e.desc}<br><textarea rows="5" id="3" name="${e.desc.replace(/[^A-Z0-9]/ig, "_")}"></textarea>
                </div>`
                break;
            case 'radio':
                let temp = { headings: e.desc, type: 'text', name: e.desc.replace(/[^A-Z0-9]/ig, "_"), options: [] };
                let t = `<div class="contentItems">
                ${e.desc}<br>`;
                let x = '';
                e.noOfItem.forEach(p => {
                    temp.options.push(p);
                    x += `<input type="radio" class="2" name="${e.desc.replace(/[^A-Z0-9]/ig, "_")}" value="${p}">&nbsp;&nbsp;${p}<br>`;
                });
                html += t + x + '</div>';
                headings.push(temp);
                break;
            case 'checkbox':
                let temp1 = { headings: e.desc, type: 'array', name: e.desc.replace(/[^A-Z0-9]/ig, "_"), options: [] };
                let q = `<div class="contentItems">
                ${e.desc}<br>`;
                let v = '';
                e.noOfItem.forEach(p => {
                    temp1.options.push(p);
                    v += `<input type="checkbox" class="1" name="${e.desc.replace(/[^A-Z0-9]/ig, "_")}" value="${p}">&nbsp;&nbsp;${p}
                    <br>`;
                });
                headings.push(temp1);
                html += q + v + '</div>';
            default:
                console.log(e);
        }
    });
    return { headings, html };
}