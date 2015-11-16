# From MixinComponentView
- showViewForCondition
    - IS view showing?
        - removeCurrentView
            component.dispose()
- showView
    - IS NOT initialized?
        - component.init
    - component.renderComponent(force)
    - component.mount
    
    
# From React
ReactClass = React.createClass({functs});
React.createElement(ReactClass, {props}, ...children);

# Nori
var factory = Nori.createComponent(type, {functs});
var element = factory('id',{props}, ...children);