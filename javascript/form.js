import extend from './extend';

let defaultOptions = {
    handler: null,
    action: '',
    data: form => {
        return new Promise((resolve, reject) => {
            resolve({});
        });
    },
    beforeSubmit: form => { return true; },
    success: (form, response) => {},
    error: (form, error) => {}
}

class Form  {
    constructor(selector, options) {
        this.options = extend(defaultOptions, options);
        this.selector = selector;
        this._submitForm = this._submitForm.bind(this);

        this.selector.addEventListener('submit', this._submitForm);
    }

    _submitForm(event){
        if(typeof event !== 'undefined') event.preventDefault();
        let cont = this.options.beforeSubmit(this.selector);

        if(cont) {
            this.options.data(this.selector).then(data => {
                this._sendForm(this.options.action, data)
                    .then(response => {
                        this.options.success(this.selector, response);
                    })
                    .catch(error => {
                        this.options.error(this.selector, error);
                    })
            }).catch(error => {
                this.options.error(this.selector, error);
            });
        }
    }

    _sendForm(url, data) {
        let formBody = Object.keys(data).map(key => {
            if (typeof data[key] === "object" && !Array.isArray(data[key]) && data[key] !== null) {
                return Object.keys(data[key]).map(k => {
                    return key + '[' + k + ']=' + data[key][k];
                }).join('&');
            }
            return key + '=' + data[key]
        }).join('&');
        return fetch(url, {
            method: 'POST',
            cache: 'no-cache',
            credentials: "same-origin",
            redirect: "follow",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(response => {
            if (!response.ok) {
                return response.json().then(function(response) {
                    throw Error(response.message);
                })
            } else {
                return response.json();
            }
        });
    }
}

export default Form;