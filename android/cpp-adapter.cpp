#include <jni.h>
#include "react-native-grab-form-input.h"

extern "C"
JNIEXPORT jint JNICALL
Java_com_grabforminput_GrabFormInputModule_nativeMultiply(JNIEnv *env, jclass type, jdouble a, jdouble b) {
    return grabforminput::multiply(a, b);
}
