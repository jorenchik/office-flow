function makeClasses(defaultClassList, passedClassList) {
    defaultClassList = defaultClassList.split(" ");
    passedClassList = passedClassList ?. split(" ");
    let classes = defaultClassList;
    if (passedClassList) {
        classes = classes.concat(passedClassList);
    }
    return classes.join(" ");
}

export {
    makeClasses
};
