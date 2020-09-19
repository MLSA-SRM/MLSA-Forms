module.exports = (array) => {
    let html = "";
    let headings = [];
    array.forEach(e => {
        let name = Math.random().toString(36).slice(2) + '_' + e.desc.replace(/[^A-Z0-9]/ig, "_");
        switch (e.option) {
            case 'text':
                let nameText = Math.random().toString(36).slice(2) + '_' + e.desc.replace(/[^A-Z0-9]/ig, "_");
                headings.push({ headings: e.desc, type: 'text', name: nameText })
                html += `<div class="contentItems">
                ${e.desc}${e.required?"<sup style='color:red;'>*</sup>":''}<br>
                <input type="text" name="${nameText}" id="0" class="textF" ${e.required?"required":''}>
                </div>`;
                break;
            case "textarea":
                let nameTextArea = Math.random().toString(36).slice(2) + '_' + e.desc.replace(/[^A-Z0-9]/ig, "_");
                headings.push({ headings: e.desc, type: 'text', name: nameTextArea })
                html += `<div class="contentItems">
                    ${e.desc}${e.required?"<sup style='color:red;'>*</sup>":''}<br><textarea ${e.required?"required":''} rows="5" id="3" name="${nameTextArea}"></textarea>
                </div>`
                break;
            case 'radio':
                let nameRadio = Math.random().toString(36).slice(2) + '_' + e.desc.replace(/[^A-Z0-9]/ig, "_");
                let temp = { headings: e.desc, type: 'text', name: nameRadio, options: [] };
                let t = `<div class="contentItems ${e.required?"req":''}" id="${nameRadio}">
                ${e.desc}${e.required?"<sup style='color:red;'>*</sup>":''}<br>`;
                let x = '';
                e.noOfItem.forEach(p => {
                    temp.options.push(p);
                    x += `<input type="radio"  class="2" name="${nameRadio}" value="${p}" ${e.required?"required":''}>&nbsp;&nbsp;${p}<br>`;
                });
                html += t + x + '</div>';
                headings.push(temp);
                break;
            case 'checkbox':
                let nameCheckbox = Math.random().toString(36).slice(2) + '_' + e.desc.replace(/[^A-Z0-9]/ig, "_");
                let temp1 = { headings: e.desc, type: 'array', name: nameCheckbox, options: [] };
                let q = `<div class="contentItems ${e.required?"req":''}" id="${nameCheckbox}">
                ${e.desc}${e.required?"<sup style='color:red;'>*</sup>":''}<br>`;
                let v = '';
                e.noOfItem.forEach(p => {
                    temp1.options.push(p);
                    v += `<input type="checkbox"  class="1" name="${nameCheckbox}" value="${p}">&nbsp;&nbsp;${p}
                    <br>`;
                });
                headings.push(temp1);
                html += q + v + '</div>';
                break;
            case 'date':
                let nameDate = Math.random().toString(36).slice(2) + '_' + e.desc.replace(/[^A-Z0-9]/ig, "_");
                headings.push({ headings: e.desc, type: 'date', name: nameDate })
                html += `<div class="contentItems">
                    ${e.desc}${e.required?"<sup style='color:red;'>*</sup>":''}<br>
                    <input type="date" name="${nameDate}" id="0" class="textF" ${e.required?"required":''}>
                    </div>`;
                break;
            case 'datetime-local':
                let nameDateTime = Math.random().toString(36).slice(2) + '_' + e.desc.replace(/[^A-Z0-9]/ig, "_");
                headings.push({ headings: e.desc, type: 'datetime-local', name: nameDateTime })
                html += `<div class="contentItems">
                        ${e.desc}${e.required?"<sup style='color:red;'>*</sup>":''}<br>
                        <input type="datetime-local" name="${nameDateTime}" id="0" class="textF" ${e.required?"required":''}>
                        </div>`;
                break;
            case 'time':
                let nameTime = Math.random().toString(36).slice(2) + '_' + e.desc.replace(/[^A-Z0-9]/ig, "_");
                headings.push({ headings: e.desc, type: 'time', name: nameTime })
                html += `<div class="contentItems">
                            ${e.desc}${e.required?"<sup style='color:red;'>*</sup>":''}<br>
                            <input type="time" name="${nameTime}" id="0" class="textF" ${e.required?"required":''}>
                            </div>`;
                break;
            default:
                console.log(e);
        }
    });
    return { headings, html };
}