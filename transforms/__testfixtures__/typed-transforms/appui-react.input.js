import { CategoryTreeWithSearchBox, COLOR_THEME_DEFAULT, ConfigurableUiManager, ContentGroupManager, ContentLayoutProps, FunctionKey, IModelAppUiSettings, IModelConnectedCategoryTree, IModelConnectedModelsTree, IModelConnectedSpatialContainmentTree, ReactMessage, SavedView, SavedViewProps, SavedViewLayout, SavedViewLayoutProps, SignIn, SignOutModalFrontstage, SpecialKey, UserProfileBackstageItem, WidgetState } from "@bentley/ui-framework";

let settingsStorage: IModelAppUiSettings;

let viewStateProps: SavedViewProps;
let viewState: SavedView;
let stageContentLayout: SavedViewLayout;
let stageContentLayoutProps: SavedViewLayoutProps;
