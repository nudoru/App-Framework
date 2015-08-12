# Changes

## 08-11-15
    - Added RxJS timer to Dispatcher
    - Handle events in a queue rather as soon as dispatched
    - Exposed dispatcher() from Nori
    - Nori eventCreator use Nori.dispatcher() rather than req it
    - Nori eventCreator create evtObj, dispatch it and return it
    - Event creator, added: change route, view changed to mobile / desktop
    - refactored all to call Nori.dispatcher() rather than requiring dispatcher
    
## 08-12-15
    - Added browser scroll, resize to Nori event creator
    - MixinBrowserEvents uses Nori event creator browser events
    - MixinBrowserEvents renamed init function
    - added app error and app warning constants
    - added app error and app warning event creators
