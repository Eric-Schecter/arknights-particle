uniform sampler2D textureTargetPosition;
uniform vec2 uMouse;

void main()	{
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec4 p = texture2D( texturePosition, uv );
  vec4 v = texture2D( textureVelocity, uv );
  vec4 targetPos = texture2D( textureTargetPosition, uv );
  float dis =  distance(p,targetPos);
  v += normalize(targetPos-p) * dis/20.;
  vec4 friction = -v * 0.5;
  v+=friction;
  vec3 pMouse = vec3(uMouse.x * resolution.x,0., uMouse.y * resolution.y / 2.);
  float dis2mouse = length(p.xyz- pMouse);
  v+= dis2mouse > 0.5? vec4(normalize(p.xyz-pMouse),0.) / (dis2mouse * 2.): vec4(0.);
  gl_FragColor = vec4( v.xyz , 1. );
}