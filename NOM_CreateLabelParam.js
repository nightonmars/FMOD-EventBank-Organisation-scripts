studio.menu.addMenuItem({
    name: "NOM\\Add Labelled Param",
    keySequence: "Shift+P",
    execute: function () {
        var labelsText = "";
        var paramName = "";
        

            studio.ui.showModalDialog({
            windowTitle: "Add Labelled Parameter",
            widgetType: studio.ui.widgetType.Layout,
            layout: studio.ui.layoutType.GridLayout,
            sizePolicy: studio.ui.sizePolicy.Expanding,
            windowWidth: 400,
            windowHeight: 100,
            items: [
                {
                    widgetType: studio.ui.widgetType.Label,
                    column: 0,
                    row: 0,
                    text: "Parameter Name:",
                    alignment: studio.ui.alignment.AlignTop | studio.ui.alignment.AlignLeft
                },
                {
                    widgetType: studio.ui.widgetType.LineEdit,
                    column: 0,
                    row: 1,
                    text: "",
                    sizePolicy: studio.ui.sizePolicy.Expanding,
                    onTextEdited: function () {
                        paramName = this.text();
                    }
                },
                {
                    widgetType: studio.ui.widgetType.Label,
                    column: 0,
                    row: 2,
                    text: "Enter comma-separated labels:",
                    alignment: studio.ui.alignment.AlignTop | studio.ui.alignment.AlignLeft
                },
                {
                    widgetType: studio.ui.widgetType.LineEdit,
                    column: 0,
                    row: 3,
                    text: "",
                    sizePolicy: studio.ui.sizePolicy.Expanding,
                    onTextEdited: function () {
                        labelsText = this.text();
                    }
                },
                {
                    widgetType: studio.ui.widgetType.PushButton,
                    column: 0,
                    row: 4,
                    text: "Create Labeled Parameter",
                    onClicked: function () {
                        var labels = labelsText.split(",").map(function(label) {
                            return label.trim();
                        }).filter(function(label) {
                            return label.length > 0;
                        });

                        if (labels.length === 0) {
                            studio.system.message("Please enter at least one valid label.");
                            return;
                        }

                        if (!paramName || paramName.trim().length === 0) {
                            studio.system.message("Please enter a valid parameter name.");
                            return;
                        }

                        var event = studio.window.browserCurrent();
                        if (!event) {
                            studio.system.message("No event selected in the browser.");
                            return;
                        }

                        try {
                            event.addGameParameter({ 
                                name: paramName.trim(),
                                type: studio.project.parameterType.UserEnumeration, 
                                enumerationLabels: labels, 
                                min: 0, 
                                max: labels.length - 1
                            });

                             studio.system.message("Labeled parameter added with labels: " + labels.join(", "));
                            
                            
                            
                        } catch (e) {
                            studio.system.message("Error adding parameter: " + e.message);
                        }
                    }
                }
            ]
        });
    }
});
