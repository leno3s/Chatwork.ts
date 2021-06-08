/**
 * プリセット済みアイコンの定数のクラス
 *
 * @export
 * @class IconPresetType
 */
export class IconPreset {
  public static readonly GROUP: IconPresetType = "group";
  public static readonly CHECK: IconPresetType = "check";
  public static readonly DOCUMENT: IconPresetType = "document";
  public static readonly MEETING: IconPresetType = "meeting";
  public static readonly EVENT: IconPresetType = "event";
  public static readonly PROJECT: IconPresetType = "project";
  public static readonly BUSINESS: IconPresetType = "business";
  public static readonly STUDY: IconPresetType = "study";
  public static readonly SECURITY: IconPresetType = "security";
  public static readonly STAR: IconPresetType = "star";
  public static readonly IDEA: IconPresetType = "idea";
  public static readonly HEART: IconPresetType = "heart";
  public static readonly MAGCUP: IconPresetType = "magcup"; // not typo
  public static readonly BEER: IconPresetType = "beer";
  public static readonly MUSIC: IconPresetType = "music";
  public static readonly SPORTS: IconPresetType = "sports";
  public static readonly TRAVEL: IconPresetType = "travel";
  private constructor() {}
}

export type IconPresetType =
  | "group"
  | "check"
  | "document"
  | "meeting"
  | "event"
  | "project"
  | "business"
  | "study"
  | "security"
  | "star"
  | "idea"
  | "heart"
  | "magcup"
  | "beer"
  | "music"
  | "sports"
  | "travel";
