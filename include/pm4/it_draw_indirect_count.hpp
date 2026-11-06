#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItDrawIndirectCountDef {
    static constexpr std::uint8_t opcode = 0x2b;
    static constexpr std::string_view name = "IT_DRAW_INDIRECT_COUNT";
    static constexpr std::string_view desc = "Draw with dynamic primitive draw count read from GPU memory";
};
}
