import React, { Suspense, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { useNavigate } from "react-router"
import { commonStore } from "@/store/commonStore/commonStore"
const METAL_CONFIG = {
    gold: { color: "#E6B65C", metalness: 1, roughness: 0.25 },
    silver: { color: "#CFCFCF", metalness: 0.9, roughness: 0.35 }
}

const GEM_CONFIG = {
    diamond: { color: "#fff", roughness: 0, transmission: 1, ior: 2.4, thickness: 1 },
    ruby: { color: "#9B111E", roughness: 0.05, transmission: 0.3, ior: 1.77, thickness: 0.8 }
}

const getMetal = (material) =>
    METAL_CONFIG[material?.slug === "vang" ? "gold" : "silver"] || METAL_CONFIG.gold

const getGem = (gem) =>
    gem ? GEM_CONFIG[gem.slug === "kim-cuong" ? "diamond" : "ruby"] : null
const Ring3D = ({ material, gem, gram, carat }) => {
    const metal = getMetal(material)
    const stone = getGem(gem)

    return (
        <group>
            <mesh>
                <torusGeometry args={[1.2, gram * 0.08, 32, 100]} />
                <meshStandardMaterial {...metal} />
            </mesh>
            {stone && (
                <mesh position={[0, 0.35, 0]}>
                    <octahedronGeometry args={[carat * 0.2, 0]} />
                    <meshPhysicalMaterial {...stone} transparent />
                </mesh>
            )}
        </group>
    )
}
const Bracelet3D = ({ material, gem, gram, carat }) => {
    const metal = getMetal(material)
    const stone = getGem(gem)

    return (
        <group>
            <mesh>
                <torusGeometry args={[2.2, gram * 0.1, 32, 120]} />
                <meshStandardMaterial {...metal} />
            </mesh>
            {stone && (
                <mesh position={[0, 0.6, 0]}>
                    <octahedronGeometry args={[carat * 0.15, 0]} />
                    <meshPhysicalMaterial {...stone} transparent />
                </mesh>
            )}
        </group>
    )
}
const Necklace3D = ({ material, gem, gram, carat }) => {
    const metal = getMetal(material)
    const stone = getGem(gem)

    return (
        <group>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[3, gram * 0.05, 32, 160]} />
                <meshStandardMaterial {...metal} />
            </mesh>

            {stone && (
                <mesh position={[0, -1.2, 0]}>
                    <sphereGeometry args={[carat * 0.25, 32, 32]} />
                    <meshPhysicalMaterial {...stone} transparent />
                </mesh>
            )}
        </group>
    )
}

const Earring3D = ({ material, gem, gram, carat }) => {
    const metal = getMetal(material)
    const stone = getGem(gem)

    return (
        <group>
            {[-0.7, 0.7].map((x) => (
                <group key={x} position={[x, 0, 0]}>
                    <mesh>
                        <torusGeometry args={[0.4, gram * 0.05, 16, 60]} />
                        <meshStandardMaterial {...metal} />
                    </mesh>

                    {stone && (
                        <mesh position={[0, -0.5, 0]}>
                            <octahedronGeometry args={[carat * 0.12, 0]} />
                            <meshPhysicalMaterial {...stone} transparent />
                        </mesh>
                    )}
                </group>
            ))}
        </group>
    )
}

const Pendant3D = ({ material, gem, gram, carat }) => {
    const metal = getMetal(material)
    const stone = getGem(gem)

    return (
        <group>
            <mesh>
                <cylinderGeometry args={[0.6, 0.6, gram * 0.2, 32]} />
                <meshStandardMaterial {...metal} />
            </mesh>

            {stone && (
                <mesh position={[0, 0, 0.5]}>
                    <sphereGeometry args={[carat * 0.2, 32, 32]} />
                    <meshPhysicalMaterial {...stone} transparent />
                </mesh>
            )}
        </group>
    )
}
const Crown3D = ({ material, gem, gram, carat }) => {
    const metal = getMetal(material)
    const stone = getGem(gem)

    return (
        <group>
            <mesh>
                <cylinderGeometry args={[2.5, 2.8, gram * 0.2, 32, 1, true]} />
                <meshStandardMaterial {...metal} side={2} />
            </mesh>
            {[...Array(6)].map((_, i) => {
                const angle = (i / 6) * Math.PI * 2
                return (
                    <mesh
                        key={i}
                        position={[Math.cos(angle) * 2.3, 1, Math.sin(angle) * 2.3]}
                    >
                        <coneGeometry args={[0.3, 1, 16]} />
                        <meshStandardMaterial {...metal} />
                    </mesh>
                )
            })}
            {stone &&
                [...Array(6)].map((_, i) => {
                    const angle = (i / 6) * Math.PI * 2
                    return (
                        <mesh
                            key={i}
                            position={[Math.cos(angle) * 2.3, 1.7, Math.sin(angle) * 2.3]}
                        >
                            <sphereGeometry args={[carat * 0.1, 16, 16]} />
                            <meshPhysicalMaterial {...stone} transparent />
                        </mesh>
                    )
                })}
        </group>
    )
}
export const Preview3DPage = () => {
    const navigate = useNavigate()
    const { customData, next } = commonStore()
    console.log(customData, "customDatacustomDatacustomData")
    useEffect(() => {
        if (!next) navigate("/custom")
    }, [next])

    const renderJewelry3D = () => {
        console.log(next, "nextnextnextnext")
        switch (customData?.jewelryType) {
            case "Nhẫn":
                return <Ring3D {...customData} />
            case "Vòng tay":
                return <Bracelet3D {...customData} />
            case "Vòng cổ":
                return <Necklace3D {...customData} />
            case "Bông tai":
                return <Earring3D {...customData} />
            case "Mặt dây chuyền":
                return <Pendant3D {...customData} />
            case "Vương miện":
                return <Crown3D {...customData} />
            default:
                return null
        }
    }

    return (
        <div className="w-full">
            <div className="h-full">
                <Canvas camera={{ position: [0, 3, 6], fov: 45 }}>
                    <Suspense fallback={null}>
                        <ambientLight intensity={0.7} />
                        <directionalLight position={[5, 5, 5]} intensity={1.2} />

                        {renderJewelry3D()}

                        <OrbitControls enablePan={false} />
                        <Environment preset="studio" />
                    </Suspense>
                </Canvas>
            </div>
        </div>
    )
}
