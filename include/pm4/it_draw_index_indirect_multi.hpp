#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItDrawIndexIndirectMultiDef {
    static constexpr std::uint8_t opcode = 0x28;
    static constexpr std::string_view name = "IT_DRAW_INDEX_INDIRECT_MULTI";
    static constexpr std::string_view desc = "Multi-draw indexed primitive dispatch with count buffer";
};
}
