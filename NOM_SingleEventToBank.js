studio.menu.addMenuItem({
    name: "NOM\\AddSingleEventToBank",
    keySequence: "Ctrl+B",
    execute: function () {
        //select the event in the browers
       var event = studio.window.browserCurrent();
        
       //gets the path and sets it to the var
       var eventPath = event.getPath()
       // Prompt the user for the bank path
       var bankPath = studio.system.getText("Enter the bank path:", "bank:/Master");
      

        // Find the event
        var event = studio.project.lookup(eventPath);
        if (!event) {
            studio.system.message("Event not found: " + eventPath);
            return;
        }

        // Find the bank
        var bank = studio.project.lookup(bankPath);
        if (!bank) {
            studio.system.message("Bank not found: " + bankPath);
            return;
        }

        // Add the bank to the event's relationships
        try {
            event.relationships.banks.add(bank);
        } catch (e) {
            studio.system.message("Error adding bank to event: " + e.message);
        }
    }
});


      
