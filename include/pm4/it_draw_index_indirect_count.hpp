#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItDrawIndexIndirectCountDef {
    static constexpr std::uint8_t opcode = 0x29;
    static constexpr std::string_view name = "IT_DRAW_INDEX_INDIRECT_COUNT";
    static constexpr std::string_view desc = "Indexed draw with dynamic draw count read from GPU memory";
};
}
