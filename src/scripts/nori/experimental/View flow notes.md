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