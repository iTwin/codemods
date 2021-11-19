import { ConfigurableUiManager, StageContentLayout, StageContentLayoutProps, SYSTEM_PREFERRED_COLOR_THEME, UserSettingsStorage, ViewStateHelper, ViewStateHelperProps } from "@bentley/ui-framework";
import { ContentLayoutProps, FunctionKey, SpecialKey, WidgetState } from "@bentley/ui-abstract";
import { ReactMessage } from "@bentley/ui-core";

let settingsStorage: UserSettingsStorage;

let viewStateProps: ViewStateHelperProps;
let viewState: ViewStateHelper;
let stageContentLayout: StageContentLayout;
let stageContentLayoutProps: StageContentLayoutProps;
