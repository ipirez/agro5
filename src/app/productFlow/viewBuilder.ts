export class FormView {
  getFormBuilder(elements: any) {
      return   getComponent(elements);
    }
}


  export const getComponent = (v) =>{
    let type = v.type
    let tooltip = v.description !== undefined ? `<div class="tooltip"><i class="material-icons">help</i><span class="tooltiptext">${v.description}</span></div>` : ''
    let required = v.required === true ?`<span class="fb-required">*</span>` : ''
    console.log(v)
    const component = {
      'text': ()=>{
        return `  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        ${required}${tooltip}
          <input class="mdl-textfield__input ${v.className }" type="${v.subtype}" name="${v.name}" value="${v.value}" maxlength="${v.maxlength}" id="${v.name}"  required="${v.required || false}" aria-required="${v.required || false}" id="${v.name}"  onChange="setValue(${v.id})">
          <label class="mdl-textfield__label" for="${v.name}">${v.placeholder || 'sin titulo de campo'}</label>
          <span class="mdl-textfield__error">error</span>
        </div>`
      },
      'textarea': ()=>{
        return `  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <textarea class="mdl-textfield__input ${v.className || ''}" type="${v.subtype}" matInput name="${v.name || ''}" maxlength="${v.maxlength || ''}" value="${v.value || ''}" rows="${v.rows || ''}" id="${v.name || ''}" required="${v.required || false}" aria-required="${v.required || false}" ></textarea>
      <label class="mdl-textfield__label" for="${v.name}">${v.placeholder || ''}</label>
      </div>`
      },
      'select': () =>{
        let options = v.values.map((o,i)=>{
          return `<option value="${o.value || ''}" id="${v.name}-${i}">${o.label || ''}</option>`
        })
        return `
        <section>
        ${required}${tooltip}
        <div class="mdlext-selectfield mdlext-js-selectfield">
                <select class="mdlext-selectfield__select ${v.className || ''}"   name="${v.name || ''}" id="${v.name || ''}" required="${v.required || ''}" aria-required="${v.required || ''}">
                <option value=""></option>
                ${options}
                </select>
                <label for="some-id" class="mdlext-selectfield__label">${v.placeholder || ''}</label>
              </div>
          <section>`
      },
      'radio-group': () =>{
        let options = v.values.map((o,i)=>{
          return `<label class="mdl-radio mdl-js-radio mdl-js-ripple-effect ${v.className || ''}" for="${v.name}-${i}">
                    <input type="radio" id="${v.name}-${i}" class="mdl-radio__button" name="${v.name}-${i}" value="${o.value || ''}" checked="${o.selected || false}">
                    <span class="mdl-radio__label">${o.label || ''}</span>
                  </label>`
        })
        return `
        <section>
        ${required}${tooltip}
        <strong>${v.placeholder || ''}</strong>
          ${options}
        </section>`
      },
      'number':()=>{
        return `<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
       ${required}${tooltip}
         <input class="mdl-textfield__input ${v.className || ''}" type="number" name="${v.name || ''}" value="${v.value || ''}" min="${v.min || ''}" max="${v.max || ''}" id="${v.name || ''}"  required="${v.required || false}" aria-required="${v.required || false}" id="${v.name}">
         <label class="mdl-textfield__label" for="${v.name}">${v.placeholder || ''}</label>
       </div>`
      },
      'file':()=>{
        return `<br/><div class="fileUpload"><input type="file"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Cargar archivo</button><span><i class="material-icons mdl-list__item-icon">file_upload</i>cargar archivo</span></input></div><br/>`
      },
      'date':()=>{
        return `<br/><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored calendar-btn">Calendar <input type="date" class="datePickerHidden"/> </button><br/>`
      },
      'checkbox-group':()=>{
        let options = v.values.map((o,i)=>{
          return `<label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="${v.name}-${i}">
          <input type="checkbox" id="${v.name}-${i}" class="mdl-checkbox__input" value="${o.value || ''}" checked="${o.selected || false}">
          <span class="mdl-checkbox__label">${o.label || ''}</span>
        </label>`
        })
        return `
            <section id="${v.name || ''}" class="${v.className || ''}">
            ${required}${tooltip}
            <label>${v.label}</label>
              ${options}
            </section>
        `
      },
      'default':()=>{
        console.log('elemento no planteado')
      }
    }

    return (component[type] || component['default'])()
  }
