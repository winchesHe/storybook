// this file is generated by generate-exports-file.ts
// this is done to prevent runtime dependencies from making it's way into the build/start script of the manager
// the manager builder needs to know which dependencies are 'globalized' in the ui

export default {
  react: [
    "Children",
    "Component",
    "Fragment",
    "Profiler",
    "PureComponent",
    "StrictMode",
    "Suspense",
    "__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED",
    "cloneElement",
    "createContext",
    "createElement",
    "createFactory",
    "createRef",
    "forwardRef",
    "isValidElement",
    "lazy",
    "memo",
    "startTransition",
    "unstable_act",
    "useCallback",
    "useContext",
    "useDebugValue",
    "useDeferredValue",
    "useEffect",
    "useId",
    "useImperativeHandle",
    "useInsertionEffect",
    "useLayoutEffect",
    "useMemo",
    "useReducer",
    "useRef",
    "useState",
    "useSyncExternalStore",
    "useTransition",
    "version",
  ],
  "react-dom": [
    "__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED",
    "createPortal",
    "createRoot",
    "findDOMNode",
    "flushSync",
    "hydrate",
    "hydrateRoot",
    "render",
    "unmountComponentAtNode",
    "unstable_batchedUpdates",
    "unstable_renderSubtreeIntoContainer",
    "version",
  ],
  "@storybook/components": [
    "A",
    "ActionBar",
    "AddonPanel",
    "Badge",
    "Bar",
    "Blockquote",
    "Button",
    "ClipboardCode",
    "Code",
    "DL",
    "Div",
    "DocumentWrapper",
    "ErrorFormatter",
    "FlexBar",
    "Form",
    "H1",
    "H2",
    "H3",
    "H4",
    "H5",
    "H6",
    "HR",
    "IconButton",
    "IconButtonSkeleton",
    "Icons",
    "Img",
    "LI",
    "Link",
    "ListItem",
    "Loader",
    "OL",
    "P",
    "Placeholder",
    "Pre",
    "ResetWrapper",
    "ScrollArea",
    "Separator",
    "Spaced",
    "Span",
    "StorybookIcon",
    "StorybookLogo",
    "Symbols",
    "SyntaxHighlighter",
    "TT",
    "TabBar",
    "TabButton",
    "TabWrapper",
    "Table",
    "Tabs",
    "TabsState",
    "TooltipLinkList",
    "TooltipMessage",
    "TooltipNote",
    "UL",
    "WithTooltip",
    "WithTooltipPure",
    "Zoom",
    "codeCommon",
    "components",
    "createCopyToClipboardFunction",
    "getStoryHref",
    "icons",
    "interleaveSeparators",
    "nameSpaceClassNames",
    "resetComponents",
    "withReset",
  ],
  "@storybook/channels": [
    "Channel",
    "PostMessageTransport",
    "WebsocketTransport",
    "createBrowserChannel",
  ],
  "@storybook/core-events": [
    "CHANNEL_CREATED",
    "CONFIG_ERROR",
    "CURRENT_STORY_WAS_SET",
    "DOCS_PREPARED",
    "DOCS_RENDERED",
    "FORCE_REMOUNT",
    "FORCE_RE_RENDER",
    "GLOBALS_UPDATED",
    "NAVIGATE_URL",
    "PLAY_FUNCTION_THREW_EXCEPTION",
    "PRELOAD_ENTRIES",
    "PREVIEW_BUILDER_PROGRESS",
    "PREVIEW_KEYDOWN",
    "REGISTER_SUBSCRIPTION",
    "REQUEST_WHATS_NEW_DATA",
    "RESET_STORY_ARGS",
    "RESULT_WHATS_NEW_DATA",
    "SELECT_STORY",
    "SET_CONFIG",
    "SET_CURRENT_STORY",
    "SET_GLOBALS",
    "SET_INDEX",
    "SET_STORIES",
    "SET_WHATS_NEW_CACHE",
    "SHARED_STATE_CHANGED",
    "SHARED_STATE_SET",
    "STORIES_COLLAPSE_ALL",
    "STORIES_EXPAND_ALL",
    "STORY_ARGS_UPDATED",
    "STORY_CHANGED",
    "STORY_ERRORED",
    "STORY_INDEX_INVALIDATED",
    "STORY_MISSING",
    "STORY_PREPARED",
    "STORY_RENDERED",
    "STORY_RENDER_PHASE_CHANGED",
    "STORY_SPECIFIED",
    "STORY_THREW_EXCEPTION",
    "STORY_UNCHANGED",
    "TELEMETRY_ERROR",
    "TOGGLE_WHATS_NEW_NOTIFICATIONS",
    "UNHANDLED_ERRORS_WHILE_PLAYING",
    "UPDATE_GLOBALS",
    "UPDATE_QUERY_PARAMS",
    "UPDATE_STORY_ARGS",
  ],
  "@storybook/core-events/manager-errors": [
    "Category",
    "ProviderDoesNotExtendBaseProviderError",
    "UncaughtManagerError",
  ],
  "@storybook/router": [
    "BaseLocationProvider",
    "DEEPLY_EQUAL",
    "Link",
    "Location",
    "LocationProvider",
    "Match",
    "Route",
    "buildArgsParam",
    "deepDiff",
    "getMatch",
    "parsePath",
    "queryFromLocation",
    "queryFromString",
    "stringifyQuery",
    "useNavigate",
  ],
  "@storybook/theming": [
    "CacheProvider",
    "ClassNames",
    "Global",
    "ThemeProvider",
    "background",
    "color",
    "convert",
    "create",
    "createCache",
    "createGlobal",
    "createReset",
    "css",
    "darken",
    "ensure",
    "ignoreSsrWarning",
    "isPropValid",
    "jsx",
    "keyframes",
    "lighten",
    "styled",
    "themes",
    "typography",
    "useTheme",
    "withTheme",
  ],
  "@storybook/icons": [
    "AccessibilityAltIcon",
    "AccessibilityIcon",
    "AddIcon",
    "AdminIcon",
    "AlertAltIcon",
    "AlertIcon",
    "AlignLeftIcon",
    "AlignRightIcon",
    "AppleIcon",
    "ArrowDownIcon",
    "ArrowLeftIcon",
    "ArrowRightIcon",
    "ArrowSolidDownIcon",
    "ArrowSolidLeftIcon",
    "ArrowSolidRightIcon",
    "ArrowSolidUpIcon",
    "ArrowUpIcon",
    "AzureDevOpsIcon",
    "BackIcon",
    "BasketIcon",
    "BatchAcceptIcon",
    "BatchDenyIcon",
    "BeakerIcon",
    "BellIcon",
    "BitbucketIcon",
    "BoldIcon",
    "BookIcon",
    "BookmarkHollowIcon",
    "BookmarkIcon",
    "BottomBarIcon",
    "BottomBarToggleIcon",
    "BoxIcon",
    "BranchIcon",
    "BrowserIcon",
    "ButtonIcon",
    "CPUIcon",
    "CalendarIcon",
    "CameraIcon",
    "CategoryIcon",
    "CertificateIcon",
    "ChangedIcon",
    "ChatIcon",
    "CheckIcon",
    "ChevronDownIcon",
    "ChevronLeftIcon",
    "ChevronRightIcon",
    "ChevronSmallDownIcon",
    "ChevronSmallLeftIcon",
    "ChevronSmallRightIcon",
    "ChevronSmallUpIcon",
    "ChevronUpIcon",
    "ChromaticIcon",
    "ChromeIcon",
    "CircleHollowIcon",
    "CircleIcon",
    "ClearIcon",
    "CloseAltIcon",
    "CloseIcon",
    "CloudHollowIcon",
    "CloudIcon",
    "CogIcon",
    "CollapseIcon",
    "CommandIcon",
    "CommentAddIcon",
    "CommentIcon",
    "CommentsIcon",
    "CommitIcon",
    "CompassIcon",
    "ComponentDrivenIcon",
    "ComponentIcon",
    "ContrastIcon",
    "ControlsIcon",
    "CopyIcon",
    "CreditIcon",
    "CrossIcon",
    "DashboardIcon",
    "DatabaseIcon",
    "DeleteIcon",
    "DiamondIcon",
    "DirectionIcon",
    "DiscordIcon",
    "DocChartIcon",
    "DocListIcon",
    "DocumentIcon",
    "DownloadIcon",
    "DragIcon",
    "EditIcon",
    "EllipsisIcon",
    "EmailIcon",
    "ExpandAltIcon",
    "ExpandIcon",
    "EyeCloseIcon",
    "EyeIcon",
    "FaceHappyIcon",
    "FaceNeutralIcon",
    "FaceSadIcon",
    "FacebookIcon",
    "FailedIcon",
    "FastForwardIcon",
    "FigmaIcon",
    "FilterIcon",
    "FlagIcon",
    "FolderIcon",
    "FormIcon",
    "GDriveIcon",
    "GithubIcon",
    "GitlabIcon",
    "GlobeIcon",
    "GoogleIcon",
    "GraphBarIcon",
    "GraphLineIcon",
    "GraphqlIcon",
    "GridAltIcon",
    "GridIcon",
    "GrowIcon",
    "HeartHollowIcon",
    "HeartIcon",
    "HomeIcon",
    "HourglassIcon",
    "InfoIcon",
    "ItalicIcon",
    "JumpToIcon",
    "KeyIcon",
    "LightningIcon",
    "LightningOffIcon",
    "LinkBrokenIcon",
    "LinkIcon",
    "LinkedinIcon",
    "LinuxIcon",
    "ListOrderedIcon",
    "ListUnorderedIcon",
    "LocationIcon",
    "LockIcon",
    "MarkdownIcon",
    "MarkupIcon",
    "MediumIcon",
    "MemoryIcon",
    "MenuIcon",
    "MergeIcon",
    "MirrorIcon",
    "MobileIcon",
    "MoonIcon",
    "NutIcon",
    "OutboxIcon",
    "OutlineIcon",
    "PaintBrushIcon",
    "PaperClipIcon",
    "ParagraphIcon",
    "PassedIcon",
    "PhoneIcon",
    "PhotoDragIcon",
    "PhotoIcon",
    "PinAltIcon",
    "PinIcon",
    "PlayBackIcon",
    "PlayIcon",
    "PlayNextIcon",
    "PlusIcon",
    "PointerDefaultIcon",
    "PointerHandIcon",
    "PowerIcon",
    "PrintIcon",
    "ProceedIcon",
    "ProfileIcon",
    "PullRequestIcon",
    "QuestionIcon",
    "RSSIcon",
    "RedirectIcon",
    "ReduxIcon",
    "RefreshIcon",
    "ReplyIcon",
    "RepoIcon",
    "RequestChangeIcon",
    "RewindIcon",
    "RulerIcon",
    "SearchIcon",
    "ShareAltIcon",
    "ShareIcon",
    "ShieldIcon",
    "SideBySideIcon",
    "SidebarAltIcon",
    "SidebarAltToggleIcon",
    "SidebarIcon",
    "SidebarToggleIcon",
    "SpeakerIcon",
    "StackedIcon",
    "StarHollowIcon",
    "StarIcon",
    "StickerIcon",
    "StopAltIcon",
    "StopIcon",
    "StorybookIcon",
    "StructureIcon",
    "SubtractIcon",
    "SunIcon",
    "SupportIcon",
    "SwitchAltIcon",
    "SyncIcon",
    "TabletIcon",
    "ThumbsUpIcon",
    "TimeIcon",
    "TimerIcon",
    "TransferIcon",
    "TrashIcon",
    "TwitterIcon",
    "TypeIcon",
    "UbuntuIcon",
    "UndoIcon",
    "UnfoldIcon",
    "UnlockIcon",
    "UnpinIcon",
    "UploadIcon",
    "UserAddIcon",
    "UserAltIcon",
    "UserIcon",
    "UsersIcon",
    "VSCodeIcon",
    "VerifiedIcon",
    "VideoIcon",
    "WandIcon",
    "WatchIcon",
    "WindowsIcon",
    "WrenchIcon",
    "YoutubeIcon",
    "ZoomIcon",
    "ZoomOutIcon",
    "ZoomResetIcon",
    "iconList",
  ],
  "@storybook/manager-api": [
    "ActiveTabs",
    "Consumer",
    "ManagerContext",
    "Provider",
    "addons",
    "combineParameters",
    "controlOrMetaKey",
    "controlOrMetaSymbol",
    "eventMatchesShortcut",
    "eventToShortcut",
    "isMacLike",
    "isShortcutTaken",
    "keyToSymbol",
    "merge",
    "mockChannel",
    "optionOrAltSymbol",
    "shortcutMatchesShortcut",
    "shortcutToHumanString",
    "types",
    "useAddonState",
    "useArgTypes",
    "useArgs",
    "useChannel",
    "useGlobalTypes",
    "useGlobals",
    "useParameter",
    "useSharedState",
    "useStoryPrepared",
    "useStorybookApi",
    "useStorybookState",
  ],
  "@storybook/client-logger": ["deprecate", "logger", "once", "pretty"],
  "@storybook/types": ["Addon_TypesEnum"],
} as const;
