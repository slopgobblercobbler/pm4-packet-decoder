#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItIndexTypeDef {
    static constexpr std::uint8_t opcode = 0x2a;
    static constexpr std::string_view name = "IT_INDEX_TYPE";
    static constexpr std::string_view desc = "Specify index buffer index size format for subsequent draw packets";
};
}
