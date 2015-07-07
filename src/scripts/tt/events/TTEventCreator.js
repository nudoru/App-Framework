define('TT.Events.TTEventCreator',
  function (require, module, exports) {

    var _dispatcher            = require('Nori.Utils.Dispatcher'),
        _ttEventConstants     = require('TT.Events.TTEventConstants');

    exports.addAssignment = function(projectID) {
      _dispatcher.publish({
        type: _ttEventConstants.ADD_ASSIGNMENT,
        payload: {
          projectID: projectID
        }
      });
    };

    exports.archiveAssignment = function(assignmentID) {
      _dispatcher.publish({
        type: _ttEventConstants.ARCHIVE_ASSIGNMENT,
        payload: {
          assignmentID: assignmentID
        }
      });
    };

    exports.updateAssignments = function(data) {
      _dispatcher.publish({
        type: _ttEventConstants.UPDATE_ASSIGNMENTS,
        payload: {
          data: data
        }
      });
    };

    exports.submitTimeCard = function() {
      _dispatcher.publish({
        type: _ttEventConstants.SUBMIT_TIMECARD,
        payload: {}
      });
    };

    exports.unSubmitTimeCard = function(comments) {
      _dispatcher.publish({
        type: _ttEventConstants.UNLOCK_TIMECARD,
        payload: {
          comments: comments
        }
      });
    };

    exports.updateTimeCard = function(data) {
      _dispatcher.publish({
        type: _ttEventConstants.UPDATE_TIMECARD,
        payload: {
          data: data
        }
      });
    };

    exports.goWeekForward = function() {
      _dispatcher.publish({
        type: _ttEventConstants.TIMECARD_WEEKFORWARD,
        payload: {}
      });
    };

    exports.goWeekBackward = function() {
      _dispatcher.publish({
        type: _ttEventConstants.TIMECARD_WEEKBACKWARD,
        payload: {}
      });
    };

  });