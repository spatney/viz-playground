var mockHost = {
    createSelectionIdBuilder: function () {
        return {
            withCategory: function () { return this },
            withSeries: function () { return this },
            withMeasure: function () { return this },
            createSelectionId: function () {
                return {
                    equals: function () { return false },
                    includes: function () { return false },
                    getKey: function () { return "fakekey" },
                    getSelector: "",
                    getSelectorsByColumn: function () { return [] },
                    hasIdentity: function () { return false }
                }
            }
        }
    },
    createSelectionManager: function () {
        return {
            select: function () {
                return {
                    then: function (fx) { return fx([]) }
                }
            },
            hasSelection: function () { return false },
            clear: function () {
                return {
                    then: function (fx) { return fx([]) }
                }
            },
            getSelectionIds: function () { return [] }
        }
    },
    colors: [{ value: 'green' }, { value: 'blue' }]
}

var getJSON = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("get", url, true);
    xhr.responseType = "json";
    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            callback(null, xhr.response);
        } else {
            callback(status);
        }
    };
    xhr.send();
};

function addStyleString(str) {
    var node = document.createElement('style');
    node.innerHTML = str;
    document.body.appendChild(node);
}

function load() {
    var name = window.frameElement.getAttribute('name');
    
    getJSON(name+'/dataViews.json', function (e, d) {
        var dataViews = d;
        getJSON(name+'/pbiviz.json', function (e, d) {
            var json = d.content ? d : JSON.parse(d);
            var content = json.content;
            var js = content.js;

            addStyleString(content.css);
            eval(content.js);

            var guid = json.visual.guid;
            var plugin = powerbi.visuals.plugins[guid];
            var element = document.getElementById('host');
            element.className = 'visual-' + guid;
            var viz = plugin.create({
                element: element,
                host: mockHost
            });

            viz.update({ dataViews: dataViews, viewport: { height: window.innerHeight, width: window.innerWidth } });
        });
    });
}

load();