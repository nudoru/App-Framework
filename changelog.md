# Changes

## 08-11-15
    - Added RxJS timer to Dispatcher
    - Handle events in a queue rather as soon as dispatched
    - Exposed dispatcher() from Nori
    - Nori eventCreator use Nori.dispatcher() rather than req it
    - Nori eventCreator create evtObj, dispatch it and return it
    - Event creator, added: change route, view changed to mobile / desktop
    - refactored all to call Nori.dispatcher() rather than requiring dispatcher