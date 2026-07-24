import { useRef, useEffect } from 'react'
import * as THREE from 'three'

/* Interactive 3D particle globe + orbiting ring.
   Reacts to mouse, glows, auto-rotates. Pure three, no addons. */
export default function Hero3D() {
  const mount = useRef(null)

  useEffect(() => {
    const el = mount.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100)
    camera.position.z = 4.2

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    el.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)

    // --- particle sphere ---
    const COUNT = 1100
    const pos = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      const r = 1.6
      const theta = Math.acos(2 * Math.random() - 1)
      const phi = 2 * Math.PI * Math.random()
      pos[i * 3] = r * Math.sin(theta) * Math.cos(phi)
      pos[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi)
      pos[i * 3 + 2] = r * Math.cos(theta)
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const pMat = new THREE.PointsMaterial({
      size: 0.035, color: 0xa78bfa, transparent: true, opacity: 0.9,
      blending: THREE.AdditiveBlending, depthWrite: false,
    })
    group.add(new THREE.Points(pGeo, pMat))

    // --- wireframe core ---
    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.15, 1),
      new THREE.MeshBasicMaterial({ color: 0x7a5cff, wireframe: true, transparent: true, opacity: 0.35 })
    )
    group.add(wire)

    // --- orbiting rings ---
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xa78bfa, transparent: true, opacity: 0.5, side: THREE.DoubleSide })
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.05, 0.006, 8, 120), ringMat)
    ring1.rotation.x = Math.PI / 2.4
    group.add(ring1)
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.35, 0.005, 8, 120), ringMat.clone())
    ring2.rotation.x = Math.PI / 1.7
    ring2.rotation.y = Math.PI / 5
    group.add(ring2)

    // --- a few bright orbiting nodes ---
    const nodes = []
    for (let i = 0; i < 6; i++) {
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
      )
      nodes.push({ mesh: m, a: Math.random() * Math.PI * 2, r: 2.05 + Math.random() * 0.3, s: 0.3 + Math.random() * 0.4, tilt: Math.random() * Math.PI })
      group.add(m)
    }

    let mx = 0, my = 0, tx = 0, ty = 0
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      tx = ((e.clientX - r.left) / r.width - 0.5) * 0.6
      ty = ((e.clientY - r.top) / r.height - 0.5) * 0.6
    }
    el.addEventListener('mousemove', onMove)

    const resize = () => {
      const r = el.getBoundingClientRect()
      renderer.setSize(r.width, r.height, false)
      camera.aspect = r.width / r.height
      camera.updateProjectionMatrix()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(el)

    let raf, t = 0
    const tick = () => {
      t += 0.005
      mx += (tx - mx) * 0.05
      my += (ty - my) * 0.05
      group.rotation.y += 0.0016 + mx * 0.02
      group.rotation.x = my * 0.5
      wire.rotation.y -= 0.002
      ring1.rotation.z += 0.001
      ring2.rotation.z -= 0.0014
      nodes.forEach((n) => {
        n.a += 0.01 * n.s
        n.mesh.position.set(
          Math.cos(n.a) * n.r,
          Math.sin(n.a) * Math.sin(n.tilt) * n.r,
          Math.sin(n.a) * Math.cos(n.tilt) * n.r
        )
      })
      renderer.render(scene, camera)
      raf = requestAnimationFrame(tick)
    }
    if (reduce) renderer.render(scene, camera)
    else tick()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      el.removeEventListener('mousemove', onMove)
      renderer.dispose()
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement)
    }
  }, [])

  return <div className="hero3d" ref={mount} aria-hidden="true" />
}