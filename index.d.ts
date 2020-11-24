import { ViewStyle, TextProps, ImageProps, TextStyle, StyleProp } from "react-native";

type Image = {
  /**
   * The url of the image
   */
  url: string;
  /**
   * The height of the image
   */
  height: number;
  /**
 * The width of the image
 */
  width: number;
}




type NativeAd = {
  /**
   * Title of the native ad.
   */
  headline: string;

  /**
   * Description of the native ad.
   */
  tagline: string;
  /**
   * Advertiser of the native ad.
   */
  advertiser: string;
  /**
   * If the ad is for a paid app or service, price value.
   */
  price: string;

  /**
   * Aspect ratio of the Content loaded inside MediaView.
   * You should use this to calculate the correct width and height of the MediaView.
   */
  aspectRatio: number;
  /**
   * If ad is for an app, then name of the store.
   */
  store: string;
  /**
   * Icon / Logo of the adveriser or the product advertised in ad.
   */
  icon: string;
  /**
   * An array of images along with the ad.
   */
  images: Array<Image>;
  /**
   * callToAction text value for the native ad.
   */
  callToAction: string;
  /**
   * If ad is for an app, then its rating on the respective store.
   */
  rating: number;

  /**
   * if ad has video content or not.
   */
  video: boolean;
};

type options = {
  adChoicesPlacement: {
    TOP_LEFT: number,
    TOP_RIGHT: number,
    BOTTOM_RIGHT: number,
    BOTTOM_LEFT: number
  },
  mediaAspectRatio:{
    ANY:number,
    LANDSCAPE:number,
    PORTRAIT:number,
    SQUARE:number,
    UNKNOWN:number
  }
}


/**
 * | Name      | Description |
| --------- | -------- |
| G | "General audiences." Content suitable for all audiences, including families and children.  |
| MA | "Mature audiences." Content suitable only for mature audiences; includes topics such as alcohol, gambling, sexual content, and weapons.  |
| PG | "Parental guidance." Content suitable for most audiences with parental guidance, including topics like non-realistic, cartoonish violence.  |
| T | "Teen." Content suitable for teen and older audiences, including topics such as general health, social networks, scary imagery, and fight sports. |
| UNSPECIFIED | Set default value to ""|
 */
type MAX_AD_CONTENT_RATING = 'G' | 'MA' | 'PG' | 'T' | 'UNSPECIFIED';

type AdManagerConfiguration = {
  maxAdContentRating: MAX_AD_CONTENT_RATING,
  tagForChildDirectedTreatment: boolean,
  tagForUnderAgeConsent: boolean,
  testDeviceIds: Array<string>
}

type ImagePropsWithOptionalSource = Omit<ImageProps, 'source'> & Partial<Pick<ImageProps, 'source'>>;


type NativeAdViewProps = {
  /**
   * When you are designing your ad, placeholders
   * for the ad will be loaded so you can easily
   * design, because for each type of ad
   * recieved from the server, not all
   * the info is available.
   */

  enableTestMode?: boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;

  /**
   * Time after which a new ad should be
   * requested from the server. Default is 1 minute (60000 ms);
   */
  refreshInterval?: number;

  /**
   * Set the type of Ad this AdView should load.
   */
  type?: "image" | "video";

  /**
   * Ad preloading is enabled by default. You can set this to false
   * if you want to request a new Ad everytime the NativeAdView loads.
   */
  usePreloadedAds?:boolean;
  onAdOpened?: Function<void>;
  onAdClosed?: Function<void>;
  onAdLeftApplication?: Function<void>;
  onAdImpression?: Function<void>;
  onAdClicked?: Function<void>;
  onAdLoaded?: Function<void>;
  onUnifiedNativeAdLoaded?: (event: NativeAd) => {};
  onAdFailedToLoad?: Function<void>;
};

type SimpleViewProps = {
  style?: StyleProp<ViewStyle>;
};

type NestedTextProps = {
  style?: StyleProp<ViewStyle>;
  textStyle?: TextStyle;
  allCaps?: boolean;
  allowFontScaling?: boolean;
};

type StarViewProps = {
  style?: StyleProp<ViewStyle>,
  size?: number,
  iconSet?: 'Entypo' | 'EvilIcons' | 'Feather' | 'FontAwesome' | 'Foundation' | 'Ionicons' | 'MaterialIcons' | 'MaterialCommunityIcons' | 'Octicons' | 'Zocial' | 'SimpleLineIcons',
  fullIcon?: string,
  halfIcon?: string,
  emptyIcon?: string,
}


declare module "react-native-admob-native-ads" {


  /**
   *
   * Wrapper for the UnifiedNativeAdView from Google Ads SDK. All your views should be
   * wrapped inside this view always.
   *
   */

  export default function NativeAdView(
    props: NativeAdViewProps
  ): JSX.Element;


  /**
   * AdManager can be used to configure your ads on App Startup such as setting test devices.
   *
   */

  export const AdManager = {

    /**
    * Configure your Ad Requests during App Startup. You need to pass a single object as an argument with atleast one of the following properties

   | Name      | Type | Required |
   | --------- | -------- | -------- |
   | testDeviceIds | `Array<string>` | no  |
   | maxAdContentRating | AdManager.MAX_AD_CONTENT_RATING | no  |
   | tagForChildDirectedTreatment | AdManager.TAG_FOR_CHILD_DIRECTED_TREATMENT | no  |
   | tagForUnderAgeConsent | AdManager.TAG_FOR_UNDER_AGE_CONSENT | no  |

   Example:

   ```js

   const config = {
     testDeviceIds:["YOUR_TEST_DEVICE_ID"],
     maxAdContetRating: 'MA',
     tagForChildDirectedTreatment: false,
     tagForUnderAgeConsent: false
   }

   AdManager.setRequestConfiguration(config);

   ```
    *
    */

    setRequestConfiguration: (config: Partial<AdManagerConfiguration>) => {},

    /**
     * Check if the current device is registered as a test device to show test ads.

  ```js
    AdManager.isTestDevice().then(result => console.log(result))
  ```
  return: `boolean`
     */
    isTestDevice: async () => {},

    /**
     * Setup adUnitIDs for your ads. You should call this function in 
     * index.js or App.js when the app starts.
     * 
     * In debug mode always use test ad unit ids. You can get 
     * the latest test ad unit ids from here:
     * https://developers.google.com/admob/android/test-ads#sample_ad_units
     * 
     * Use your AdMob account adUnitIDs only in release builds or after 
     * registering your device as a testDevice using `setRequestConfiguration` 
     * function of AdManager in debug mode.
     * 
     * @param {string} adUnitId adUnitID for native advanced image ads. 
     * @param {string} videoAdUnitId adUnitID for native advanced video ads. 
     */
    setAdUnitIds: (adUnitId?:string,videoAdUnitId?:string) => {},

    /**
     * Set number of ads to preload. Max is 5 for each.
     * 
     * @param {number} imageAdsToLoad Number of native advanced image ads to load. Max is 5.
     * @param {number} videoAdsToLoad Number of native advanced image ads to load. Max is 5.
     */

    setNumberOfAdsToLoad: (imageAdsToLoad?:number, videoAdsToLoad?:number) => {},

     /**
   * Under the Google EU User Consent Policy, you must make certain disclosures
   * to your users in the European Economic Area (EEA) and obtain their consent
   * to use cookies or other local storage, where legally required, and to use
   * personal data (such as AdID) to serve ads. This policy reflects the requirements
   * of the EU ePrivacy Directive and the General Data Protection Regulation (GDPR).
   *
   * You can use library such as: https://github.com/birgernass/react-native-ad-consent
   * to obtain the consent or if you are using rn-firebase you can obtain the consent from
   * there and then pass the consent to this library. If user has selected
   * non-personalized-ads then pass `true` and non-personalized ads will be shown to the user.
   *
   */
    setRequestNonPersonalizedAdsOnly: (requestNonPersonalizedAdsOnly:boolean)=> {},

    /**
   * Set Media Aspect Ratio for the ads. Ads can be Landscape, Portrait, 
   * Square or Any type. This is an App Wide setting which means all ads 
   * returned will be of this aspect ratio type.
   *
   * import `AdOptions` then pass parameter from there: `AdOptions.mediaAspectRatio`
   * 
   */
    setMediaAspectRatio:(aspectRatio:number) => {},

    /**
   * Placement of AdChoicesView in any of the 4 corners of the ad
   *
   * import AdOptions then pass parameter from there: AdOptions.adChoicesPlacement
   */
    setAdChoicesPlacement:(placement:number) => {},

    /**
     * Set this to true if you want video ads to have sound.
     */
    setVideosStartMuted:(muted:boolean) => {},

    /**
     * Preload native image ads. You should call this function in 
     * index.js or App.js when the app starts.
     */
    preloadNativeAds:() => {},

    /**
     * Preload native video ads. You should call this function in 
     * index.js or App.js when the app starts.
     */
    preloadNativeVideoAds:() => {}
  }

  export const AdOptions: options;


  /**
  * Ad Badge shows the {ad} badge on top of the ad telling the user that this is an AD.
  *
  */

  export function AdBadge(props: NestedTextProps): JSX.Element;

  /**
   * The title of the native ad recieved from server is renderd here.
   * You dont need to pass any values to it. It will automatically get the title from
   * context and load it.
   * You should on style it as you want.
   */
  export function HeadlineView(props: TextProps): JSX.Element;

  /**
   *  * The description of the native ad recieved from server is renderd here.
   */
  export function TaglineView(props: TextProps): JSX.Element;

  /**
   *  * The adveriser name of the native ad recieved from server is renderd here.
   */
  export function AdvertiserView(props: TextProps): JSX.Element;
  /**
   * If the ad or service is paid,then this view can be used to show the price.
   */
  export function PriceView(props: TextProps): JSX.Element;

  /**
   * Many times, the ad recieved will be from the Google Playstore or AppStore for iOS.
   * In that case, you can show the store name using this view.
   */
  export function StoreView(props: TextProps): JSX.Element;

  /**
   * If you want to explicitly show only Images and no video etc, use ImageView.
   */
  export function ImageView(props: ImagePropsWithOptionalSource): JSX.Element;
  /**
   * Icon/Logo of the adveriser shown inside this view
   */
  export function IconView(props: ImagePropsWithOptionalSource): JSX.Element;

  /**
   * If the ad has images or video content. It will be loaded inside the MediaView.
   */
  export function MediaView(props: SimpleViewProps): JSX.Element;

  /**
   * A simple button to open the adveriser website or store page etc. It is a simple
   * Text Component wrapped in a View. I dont know how to make the Touchables or Buttons
   * work since they have no effect. Native side does not recieve the call hence simple
   * Text Component is used to receive the clicks.
   */
  export function CallToActionView(
    props: NestedTextProps
  ): JSX.Element;

  /**
   * A Star Rating View to show the star rating for the app ads that you might recieve from
   * the server.
   */
  export function StarRatingView(
    props: StarViewProps
  ): JSX.Element;
}
