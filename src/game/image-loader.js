const imagePromises = new Map();

export function loadImage(src, assetLabel = 'image') {
  if (imagePromises.has(src)) return imagePromises.get(src);

  const promise = new Promise(function(resolve, reject){
    const img = new Image();
    img.onload = function(){ resolve(img); };
    img.onerror = function(){
      imagePromises.delete(src);
      reject(new Error('Failed to load ' + assetLabel + ': ' + src));
    };
    img.src = src;
  });

  imagePromises.set(src, promise);
  return promise;
}

export async function loadImages(srcs, assetLabel = 'image') {
  const uniqueSrcs = [];
  srcs.forEach(function(src){
    if (src && uniqueSrcs.indexOf(src) < 0) uniqueSrcs.push(src);
  });

  const entries = await Promise.all(uniqueSrcs.map(function(src){
    return loadImage(src, assetLabel).then(function(img){
      return [src, img];
    });
  }));

  const images = {};
  entries.forEach(function(entry){
    images[entry[0]] = entry[1];
  });
  return images;
}
