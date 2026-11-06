#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItSurfaceSyncDef {
    static constexpr std::uint8_t opcode = 0x43;
    static constexpr std::string_view name = "IT_SURFACE_SYNC";
    static constexpr std::string_view desc = "Cache invalidation and memory surface synchronization packet";
};
}
