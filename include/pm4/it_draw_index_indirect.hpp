#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItDrawIndexIndirectDef {
    static constexpr std::uint8_t opcode = 0x25;
    static constexpr std::string_view name = "IT_DRAW_INDEX_INDIRECT";
    static constexpr std::string_view desc = "Indirect indexed primitive draw sourcing parameters from GPU buffer";
};
}
