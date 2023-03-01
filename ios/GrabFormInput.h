#ifdef __cplusplus
#import "react-native-grab-form-input.h"
#endif

#ifdef RCT_NEW_ARCH_ENABLED
#import "RNGrabFormInputSpec.h"

@interface GrabFormInput : NSObject <NativeGrabFormInputSpec>
#else
#import <React/RCTBridgeModule.h>

@interface GrabFormInput : NSObject <RCTBridgeModule>
#endif

@end
