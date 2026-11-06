#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItSetContextRegPairsPackedDef {
    static constexpr std::uint8_t opcode = 0x53;
    static constexpr std::string_view name = "IT_SET_CONTEXT_REG_PAIRS_PACKED";
    static constexpr std::string_view desc = "Write packed context register pairs (two 16-bit registers per dword)";
};
}
